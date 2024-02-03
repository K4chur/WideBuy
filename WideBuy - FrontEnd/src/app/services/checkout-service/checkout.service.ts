import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Country} from "../../common/country/country";
import {environment} from "../../../environments/environment.development";
import {Region} from "../../common/region/region";
import {City} from "../../common/city/city";
import {Purchase} from "../../common/purchase/purchase";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  countriesUrl = environment.wideBuyUrl + '/countries/search/findAllCountriesWithoutPagination'
  regionsUrl = environment.wideBuyUrl + '/regions/search/findByCountryCode?code=';
  citiesUrl = environment.wideBuyUrl + '/cities/search/findByCountryCodeAndRegionCode';
  purchaseUrl = environment.baseUrl+'/checkout/purchase';

  constructor(private http: HttpClient) {
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.http.post<Purchase>(this.purchaseUrl, purchase);
  }

  fetchCountries(): Observable<Country[]> {
    return this.http.get<GetCountries>(this.countriesUrl).pipe(map(response => response._embedded.countries))
  }

  fetchRegions(countryCode: string): Observable<Region[]> {
    return this.http.get<GetRegions>(this.regionsUrl + countryCode).pipe(map(response => response._embedded.regions))
  }

  fetchCities(countryCode: string, regionCode: string): Observable<City[]> {
    return this.http.get<GetCities>(this.citiesUrl+`?conCode=${countryCode}&regCode=${regionCode}`).pipe(map(response => response._embedded.cities))
  }

  getYears(){
    let years: number[] = [];
    for (let i = 0; i < 10; i++){
      years.push(new Date().getFullYear()+i)
    }
    return years
  }

  getMonths(year: number){
    let months: number[] = []
    const currentDate = new Date();
    if(currentDate.getFullYear() == year){
      let i = currentDate.getMonth()+1;
      for (i ;i <= 12; i++){
        months.push(i);
      }
    } else {
      for (let i = 1; i <= 12; i++){
        months.push(i);
      }
    }
    return months
  }
}

interface GetCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetRegions {
  _embedded: {
    regions: Region[];
  }
}

interface GetCities {
  _embedded: {
    cities: City[];
  }
}
