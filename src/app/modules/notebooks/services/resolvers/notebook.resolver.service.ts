import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {NotebookService} from '../notebook.service';
import {NotebookModel} from '../../models/Notebook.model';


@Injectable()
export class NotebookResolverService implements Resolve<NotebookModel> {
  constructor(private notebookService: NotebookService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NotebookModel> {

    return this.notebookService.getNotebook(route.params.id);
  }
}
