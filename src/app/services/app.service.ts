import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {Observable, throwError} from 'rxjs';
import {CourseModel} from '../modules/courses/models/Course.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userIn = false;
  cardStatus = false;
  requestStatus = false;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  setUserIn(value: boolean) {
    this.userIn = value;
  }

  setCardStatus(value) {
    this.cardStatus = value;
  }

  getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  activateAccount() {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params.token;
      return this.http.get<CourseModel[]>(`http://localhost:8081/api/auth/activate?token=${token}`)
        .subscribe((m) => {
            console.log(m);
          },
          err => alert('Something went wrong. Please try again'));
    });
  }

  setRequestStatus(value) {
    this.requestStatus = value;
  }

}
