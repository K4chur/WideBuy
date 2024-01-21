import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {User} from "../../common/user/user";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  authSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  registerUrl: string = environment.baseUrl + '/signUp'
  loginUrl: string = environment.baseUrl + '/signIn'
  isAuthenticated$ = this.authSubject.asObservable();
  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<string> {
    return this.http.post<RegistrationResponse>(this.registerUrl, user).pipe(map(response => response.message))
  }

  login(username: string, password: string): Observable<string> {
    const httpOptions = {
      headers: {
        Authorization: 'Basic ' + window.btoa(username + ':' + password)
      },
      responseType: 'text' as 'text',
    };
    return this.http.post(this.loginUrl, null, httpOptions);
  }
}

interface RegistrationResponse {
  message: string
}
