import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pre-view-tv',
  templateUrl: './pre-view-tv.component.html',
  styleUrls: ['./pre-view-tv.component.css']
})
export class PreViewTvComponent implements OnInit {

  @Input() tvsArray;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(id: number) {
    this.router.navigate([(this.tvsArray[0].type_of_goods).toLocaleLowerCase() + '/' + id]);
  }

}
