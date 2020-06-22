import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PhoneModel} from '../../phones/models/Phone.model';
import {NotebookModel} from '../../notebooks/models/Notebook.model';
import {TVModel} from '../../tv/models/TV.model';
import {Observable} from 'rxjs';
import {OrderModel} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  createPhone(phone: PhoneModel): Observable<{ id }> {
    return this.http.post<{ id }>(' http://localhost:3333/phones', {...phone});
  }

  createNotebook(notebook: NotebookModel): Observable<{ id }> {
    return this.http.post<{ id }>(' http://localhost:3333/notebooks', {...notebook});
  }

  createTV(TV: TVModel): Observable<{ id }> {
    return this.http.post<{ id }>('http://localhost:3333/tv', {...TV});
  }

  getDoesntDoneOrders(): Observable<OrderModel> {
    return this.http.get<OrderModel>('http://localhost:3333/invoice');
  }

  getCompletedOrders(): Observable<OrderModel> {
    return this.http.get<OrderModel>('http://localhost:3333/invoice/completed');
  }

  getAllOrders(): Observable<OrderModel> {
    return this.http.get<OrderModel>('http://localhost:3333/invoice/all');
  }

  sendGoods(id: number) {
    return this.http.post<{ id }>('http://localhost:3333/invoice/sendGood', {id});
  }

  getGoodById(id: number, goodType: string): Observable<any> {
    switch (goodType) {
      case 'Phones':
        return this.http.get<PhoneModel>(`http://localhost:3333/phones/${id}?type_of_goods=Phones`);
      case 'TV':
        return this.http.get<PhoneModel>(`http://localhost:3333/tv/${id}?type_of_goods=TV`);
      case 'Notebooks':
        return this.http.get<PhoneModel>(`http://localhost:3333/Notebooks/${id}?type_of_goods=Notebooks`);

    }
  }
}
