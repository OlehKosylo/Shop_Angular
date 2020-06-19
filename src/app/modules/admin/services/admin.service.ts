import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PhoneModel} from '../../phones/models/Phone.model';
import {NotebookModel} from '../../notebooks/models/Notebook.model';
import {TVModel} from '../../tv/models/TV.model';
import {Observable} from 'rxjs';

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
    return this.http.post<{ id }>(' http://localhost:3333/tv', {...TV});
  }
}
