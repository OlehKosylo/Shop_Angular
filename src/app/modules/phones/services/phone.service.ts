import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../services/app.service';
import {PreViewPhoneModel} from '../models/preViewPhone.model';
import {Observable} from 'rxjs';
import {PhoneModel} from '../models/Phone.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient, private appService: AppService) { }

  getPhones(): Observable<PreViewPhoneModel[]> {

    return this.http.get<PreViewPhoneModel[]>('http://localhost:3333/phones?type_of_goods=Phones');
  }

  getPhone(id: number): Observable<PhoneModel> {

    return this.http.get<PhoneModel>(`http://localhost:3333/phones/${id}?type_of_goods=Phones&id=${id}`);
  }

}
