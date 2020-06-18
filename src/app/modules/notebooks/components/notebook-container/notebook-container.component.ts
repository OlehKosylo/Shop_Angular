import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app.service';
import {PreViewNotebookModel} from '../../models/preViewNotebook.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-phone-container',
  templateUrl: './notebook-container.component.html',
  styleUrls: ['./notebook-container.component.css']
})
export class NotebookContainerComponent implements OnInit {

  notebooksArray: PreViewNotebookModel[] = [];

  constructor(public appService: AppService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.notebooksArray = res.notebooksResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }

}

