import {Component, OnInit} from '@angular/core';
import {CheckoutService} from "../../services/checkout-service/checkout.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Country} from "../../common/country/country";
import {Region} from "../../common/region/region";
import {City} from 'src/app/common/city/city';
import {debounceTime, distinctUntilChanged, map, Observable} from "rxjs";
import {WideBuyValidators} from "../../validators/wide-buy-validators";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  form!: FormGroup;

  modelCountry: any;
  modelRegion: any;
  modelCity: any;
  countries: Country[] = [];
  regions: Region[] = [];
  cities: City[] = [];
  countryCode: string = '';

  years: number[] = [];
  months: number[] = [];

  commonValidation = [Validators.required, Validators.minLength(2), WideBuyValidators.noWhitespaceValidator]
  constructor(private checkoutService: CheckoutService) {
  }

  ngOnInit() {
    this.years = this.checkoutService.getYears();
    this.months = this.checkoutService.getMonths(new Date().getMonth())
    this.checkoutService.fetchCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
    this.form = new FormGroup({
      userInfo: new FormGroup({
        firstName: new FormControl('', this.commonValidation),
        lastName: new FormControl('', this.commonValidation),
        email: new FormControl('', [Validators.required, Validators.email]),
      }),
      shippingInfo: new FormGroup({
        country: new FormControl('', this.commonValidation),
        region: new FormControl('', this.commonValidation),
        city: new FormControl('', this.commonValidation),
        street: new FormControl('', this.commonValidation),
        zipCode: new FormControl('', this.commonValidation),
      }),
      cardDetails: new FormGroup({
        cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),
        securityCode: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(3), Validators.min(100), Validators.max(999)]),
      })
    })
  }

  onSubmit() {
    console.log(this.form.value)
  }

  handleYearChange(value: string) {
    this.months = this.checkoutService.getMonths(+value);
  }

  searchCountries: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.countries.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(response => response.name),
      ),
    );

  searchRegions: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.regions.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(response => response.name),
      ),
    );

  searchCities: (text$: Observable<string>) => Observable<string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.cities.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(response => response.name),
      ),
    );

  onChangedCountry() {
    const countryName = this.form.get('shippingInfo')!.get('country')!.value
    const foundCountry = this.countries.find(country => country.name === countryName);

    if ( foundCountry != null){
      this.countryCode = foundCountry.code;
      this.checkoutService.fetchRegions(foundCountry.code).subscribe(
        data => {
          this.regions = data;
        }
      )
    }
  }


  onChangedRegion() {
    const regionName = this.form.get('shippingInfo')!.get('region')!.value;

    const foundRegion = this.regions.find(region => region.name === regionName);
    if ( foundRegion != null){
      this.checkoutService.fetchCities(this.countryCode, foundRegion.code).subscribe(
        data => {
          this.cities = data;
        }
      )
    }
  }


  get firstName(){return this.form.controls['userInfo'].get('firstName');}
  get lastName(){return this.form.controls['userInfo'].get('lastName');}
  get email(){return this.form.controls['userInfo'].get('email');}
  get country(){return this.form.controls['shippingInfo'].get('country');}
  get region(){return this.form.controls['shippingInfo'].get('region');}
  get city(){return this.form.controls['shippingInfo'].get('city');}
  get street(){return this.form.controls['shippingInfo'].get('street');}
  get zipCode(){return this.form.controls['shippingInfo'].get('zipCode');}
  get cardNumber(){return this.form.controls['cardDetails'].get('cardNumber');}
  get expirationMonth(){return this.form.controls['cardDetails'].get('expirationMonth');}
  get expirationYear(){return this.form.controls['cardDetails'].get('expirationYear');}
  get securityCode(){return this.form.controls['cardDetails'].get('securityCode');}
}
