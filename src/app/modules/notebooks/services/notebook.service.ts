import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreViewNotebookModel} from '../models/preViewNotebook.model';
import {Observable} from 'rxjs';
import {NotebookModel} from '../models/Notebook.model';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  constructor(private http: HttpClient) { }

  getNotebooks(): Observable<PreViewNotebookModel[]> {

    return this.http.get<PreViewNotebookModel[]>('http://localhost:3333/notebooks?type_of_goods=Notebooks');
  }

  getNotebook(id: number): Observable<NotebookModel> {

    return this.http.get<NotebookModel>(`http://localhost:3333/notebooks/${id}?type_of_goods=Notebooks&id=${id}`);
  }

}
