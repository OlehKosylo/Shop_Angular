import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreViewTVModel} from '../models/preViewTV.model';
import {Observable} from 'rxjs';
import {TVModel} from '../models/TV.model';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) { }

  getTVs(): Observable<PreViewTVModel[]> {

    return this.http.get<PreViewTVModel[]>('http://localhost:3333/tv?type_of_goods=TV');
  }

  getTV(id: number): Observable<TVModel> {

    return this.http.get<TVModel>(`http://localhost:3333/tv/${id}?type_of_goods=TV&id=${id}`);
  }

}
