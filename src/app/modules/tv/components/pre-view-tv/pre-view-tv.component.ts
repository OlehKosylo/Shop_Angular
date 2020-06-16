import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pre-view-phone',
  templateUrl: './pre-view-tv.component.html',
  styleUrls: ['./pre-view-tv.component.css']
})
export class PreViewTvComponent implements OnInit {

  @Input() tvsArray;

  constructor() { }

  ngOnInit(): void {
  }

}
