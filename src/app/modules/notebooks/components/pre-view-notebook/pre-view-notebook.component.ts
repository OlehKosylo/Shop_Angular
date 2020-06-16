import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pre-view-phone',
  templateUrl: './pre-view-notebook.component.html',
  styleUrls: ['./pre-view-notebook.component.css']
})
export class PreViewNotebookComponent implements OnInit {

  @Input() notebooksArray;

  constructor() { }

  ngOnInit(): void {
  }

}
