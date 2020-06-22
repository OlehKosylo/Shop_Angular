import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotebookService} from '../../services/notebook.service';

@Component({
  selector: 'app-phone-container',
  templateUrl: './notebook-container.component.html',
  styleUrls: ['./notebook-container.component.css']
})
export class NotebookContainerComponent implements OnInit {

  price: number;

  constructor(public appService: AppService, private route: ActivatedRoute,
              public notebookService: NotebookService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.notebookService.notebooksArray = res.notebooksResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );
  }


  sortByASC() {
    this.notebookService.sortByASC();
  }

  sortByDESC() {
    this.notebookService.sortByDESC();
  }

  sortByPrice() {
    this.notebookService.sortByPrice(this.price);
  }
}

