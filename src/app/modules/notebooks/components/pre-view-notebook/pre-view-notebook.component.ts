import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../../../../services/app.service';
import {NotebookService} from '../../services/notebook.service';

@Component({
  selector: 'app-pre-view-notebook',
  templateUrl: './pre-view-notebook.component.html',
  styleUrls: ['./pre-view-notebook.component.css']
})
export class PreViewNotebookComponent implements OnInit {

  @Input() notebooksArray;

  constructor(private router: Router, public appService: AppService, public notebookService: NotebookService) {
  }

  ngOnInit(): void {
  }

  navigate(id: number) {
    this.router.navigate([(this.notebooksArray[0].type_of_goods).toLocaleLowerCase() + '/' + id]);
  }

  deleteNotebook(id: number) {
    this.notebookService.deleteNotebook(id);
  }

}
