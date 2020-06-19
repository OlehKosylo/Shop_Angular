import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreViewPhoneModel} from '../models/preViewPhone.model';
import {Observable} from 'rxjs';
import {PhoneModel} from '../models/Phone.model';
import {AppService} from '../../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  phonesArray: PreViewPhoneModel[] = [];

  constructor(private http: HttpClient, private appService: AppService) {
  }

  getPhones(): Observable<PreViewPhoneModel[]> {

    return this.http.get<PreViewPhoneModel[]>('http://localhost:3333/phones?type_of_goods=Phones');
  }

  getPhone(id: number): Observable<PhoneModel> {

    return this.http.get<PhoneModel>(`http://localhost:3333/phones/${id}?type_of_goods=Phones&id=${id}`);
  }

  deletePhone(id: number) {
    this.appService.setRequestStatus(true);
    return this.http.delete(`http://localhost:3333/phones/${id}?type_of_goods=Phones`).subscribe(
      res => {
        this.phonesArray = this.phonesArray.filter(phone => phone.id !== id);
        this.appService.setRequestStatus(false);
      },
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }


  updatePhone(phone: PhoneModel) {
    this.appService.setRequestStatus(true);
    return this.http.put(`http://localhost:3333/phones`, {...phone});
  }
}
