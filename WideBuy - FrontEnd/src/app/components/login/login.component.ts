import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WideBuyValidators} from "../../validators/wide-buy-validators";
import {AuthService} from "../../services/auth-service/auth.service";
import {User} from "../../common/user/user";
import {Router} from "@angular/router";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLogging: boolean;
  form!: FormGroup;
  message: string = '';
  constructor(private authService: AuthService,
              private router: Router) {
    this.isLogging = true;
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), WideBuyValidators.noWhitespaceValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), WideBuyValidators.noWhitespaceValidator])
    })
  }

  changeType() {
    this.isLogging = !this.isLogging;
    this.message = '';
  }

  onSubmit() {
    if(this.isLogging){
      sessionStorage.removeItem("app.token");
      this.authService.login(this.form.get('username')!.value, this.form.get('password')!.value)
        .subscribe({
          next: (token) => {
            sessionStorage.setItem("app.token", token);
            const decodedToken = jwtDecode<JwtPayload>(token);
            // @ts-ignore
            sessionStorage.setItem("app.roles",  decodedToken.scope);
            // @ts-ignore
            sessionStorage.setItem("app.username",  decodedToken.username);

            this.authService.authSubject.next(true);
            this.router.navigateByUrl("/persons");
          },
          error: (error) => alert(`Login failed: ${error.status}`)
        });
    } else {
      this.authService.register(new User(this.form.get('username')!.value,this.form.get('password')!.value)).subscribe(
        data => this.message = data
      )
    }
  }

  get username(){return this.form.get('username');}
  get password(){return this.form.get('password');}

}
