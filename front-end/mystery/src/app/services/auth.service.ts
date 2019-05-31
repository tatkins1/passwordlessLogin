import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, startWith, tap, filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:3001/auth";
  options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: true
  };
  user: Observable<any>;

  constructor(private http: HttpClient) {
    this.user = this.getUser();
  }
  getUser(): Observable<any> {
    console.log("getUser invoked");

    
    return this.http.get(this.baseUrl+"/user", this.options);
  }
  sendPhoneNumber(number: string): Observable<any> {
    console.log("sendPhoneNumber invoked");
  
    let data = {
      number: number
    }
    return this.http.post<any>(this.baseUrl+"/login", JSON.stringify(data), this.options);
  }
  sendVerificationCode(code: string): Observable<any> {
    console.log("sendPhoneNumber invoked");

    let data = {
      code: code
    }
    return this.http.post<any>(this.baseUrl+"/verify", JSON.stringify(data), this.options);
  }
  logOut() {
    console.log("Logging out");

     this.http.get<any>(this.baseUrl+"/logout", this.options).subscribe(x=>x);
  }

}
