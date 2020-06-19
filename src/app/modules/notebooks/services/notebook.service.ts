import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreViewNotebookModel} from '../models/preViewNotebook.model';
import {Observable} from 'rxjs';
import {NotebookModel} from '../models/Notebook.model';
import {AppService} from '../../../services/app.service';
import {PhoneModel} from '../../phones/models/Phone.model';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  notebooksArray: PreViewNotebookModel[] = [];

  constructor(private http: HttpClient, public appService: AppService) {
  }

  getNotebooks(): Observable<PreViewNotebookModel[]> {

    return this.http.get<PreViewNotebookModel[]>('http://localhost:3333/notebooks?type_of_goods=Notebooks');
  }

  getNotebook(id: number): Observable<NotebookModel> {

    return this.http.get<NotebookModel>(`http://localhost:3333/notebooks/${id}?type_of_goods=Notebooks&id=${id}`);
  }

  deleteNotebook(id: number) {
    this.appService.setRequestStatus(true);
    return this.http.delete(`http://localhost:3333/notebooks/${id}?type_of_goods=Notebooks`).subscribe(
      res => {
        this.notebooksArray = this.notebooksArray.filter(notebook => notebook.id !== id);
        this.appService.setRequestStatus(false);
      },
      err => {
        this.appService.setRequestStatus(false);
        alert(err.error.message);
      }
    );
  }

  updateNotebook(notebook: NotebookModel) {
    this.appService.setRequestStatus(true);
    return this.http.put(`http://localhost:3333/notebooks`, {...notebook});
  }
}
