import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json', "No-Auth":"true" });

  constructor(private http: HttpClient, private toastService: ToastService) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>('http://localhost:9090/api/v1/auth/authUser', {userName: username, userPassword: password}, {headers: this.headers, observe: 'response', responseType: 'text' as 'json'})
    .pipe(map(res => res.body || ''), catchError(error => this.handleError(error, 'Något fel inträffade vid inloggning.')));
  }
  
  register(userName: string, userPassword: string, userEmail: string, userFirstname: string, userLastName: string, gender: string, birthDate: string): Observable<string> {
    return this.http.post<string>('http://localhost:9090/api/v1/auth/register', {userName, userPassword, userEmail, userFirstname, userLastName, contactInformation: 'test', roles: 'USER', gender, birthDate}, {headers: this.headers, observe: 'response', responseType: 'text' as 'json'})
    .pipe(map(res => res.body || ''), catchError(error => this.handleError(error, 'Något fel inträffade vid registrering.')));
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }

  logout(): void {
    sessionStorage.clear();
  }

  handleError(error: any, message: string): Observable<any> {
    this.toastService.show(message, {classname: 'bg-danger text-light', delay: 3000});
    return of(error);
  }



}
