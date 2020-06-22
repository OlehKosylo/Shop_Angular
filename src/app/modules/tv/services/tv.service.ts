import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreViewTVModel} from '../models/preViewTV.model';
import {Observable} from 'rxjs';
import {TVModel} from '../models/TV.model';
import {AppService} from '../../../services/app.service';
import {PreViewNotebookModel} from '../../notebooks/models/preViewNotebook.model';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  tvsArray: PreViewTVModel[] = [];

  constructor(private http: HttpClient, public appService: AppService) { }

  getTVs(): Observable<PreViewTVModel[]> {

    return this.http.get<PreViewTVModel[]>('http://localhost:3333/tv?type_of_goods=TV');
  }

  getTV(id: number): Observable<TVModel> {

    return this.http.get<TVModel>(`http://localhost:3333/tv/${id}?type_of_goods=TV&id=${id}`);
  }

  deleteTV(id: number) {
    this.appService.setRequestStatus(true);
    return this.http.delete(`http://localhost:3333/tv/${id}?type_of_goods=TV`).subscribe(
      res => {
        this.tvsArray = this.tvsArray.filter(tv => tv.id !== id);
        this.appService.setRequestStatus(false);
      },
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  updateTV(tv: TVModel) {
    this.appService.setRequestStatus(true);
    return this.http.put(`http://localhost:3333/tv`, {...tv});
  }

  sortByASC() {
    this.appService.setRequestStatus(true);
    return this.http.get<PreViewTVModel[]>('http://localhost:3333/tv/sort/ASC?type_of_goods=TV').subscribe(
      res => {
        console.log(res);
        this.tvsArray = res;
        this.appService.setRequestStatus(false);
      },
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  sortByDESC() {
    this.appService.setRequestStatus(true);
    return this.http.get<PreViewTVModel[]>('http://localhost:3333/tv/sort/DESC?type_of_goods=TV').subscribe(
      res => {
        this.tvsArray = res;
        this.appService.setRequestStatus(false);
      },
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  sortByPrice(price: number) {
    this.appService.setRequestStatus(true);
    return this.http.get<PreViewTVModel[]>(`http://localhost:3333/tv/sort/Price?type_of_goods=TV&price=${price}`)
      .subscribe(
        res => {
          this.tvsArray = res;
          this.appService.setRequestStatus(false);
        },
        err => {
          this.appService.setRequestStatus(false);
          alert(err.error.message);
        }
      );
  }
}
