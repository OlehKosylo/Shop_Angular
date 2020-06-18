import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../services/app.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private appService: AppService, private router: Router) {
  }

  getAllProducts(): Observable<any[]> {

    return this.http.get<any[]>('http://localhost:3333/invoice/allGoods');
  }

}


