import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, RendererStyleFlags2 } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Preference } from '../models/preference';
import { Region } from '../models/region';
import { User } from '../models/user';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:9090/api/v1/user/getUser');
  }

  updateUser(userEmail: string, userFirstname: string, userLastName: string,
    gender: string, birthDate: string, userRegion: string, description: string,
    facebook: string, instagram: string, discord: string, snapchat: string, userPhoneNumber: string,
    minAge: number, maxAge: number, hobbies: string[], regions: string[], preferedGender: string): Observable<string> {
    return this.http.put<string>('http://localhost:9090/api/v1/user/updateUser', {
      userEmail, userFirstname, userLastName, gender, birthDate, userRegion, description, facebook,
      instagram, discord, snapchat, userPhoneNumber, minAge, maxAge, hobbies, regions, preferedGender
    }, {headers: this.headers})
    .pipe(catchError(error => this.handleError(error, 'Något fel inträffade vid uppdatering.')));
  }

  handleError(error: any, message: string): Observable<any> {
    this.toastService.show(message, {classname: 'bg-danger text-light', delay: 3000});
    return of(error);
  }

}
