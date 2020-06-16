import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PreViewNotebookModel} from '../../models/preViewNotebook.model';
import {NotebookService} from '../notebook.service';


@Injectable()
export class NotebooksResolverService implements Resolve<PreViewNotebookModel[]> {
  constructor(private notebookService: NotebookService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PreViewNotebookModel[]> {
    return this.notebookService.getNotebooks();
  }
}
