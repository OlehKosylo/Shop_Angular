import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pre-view-goods',
  templateUrl: './pre-view-notebook.component.html',
  styleUrls: ['./pre-view-notebook.component.css']
})
export class PreViewGoodsComponent implements OnInit {

  @Input() goodsArray;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navigate(id: number) {
    this.router.navigate([(this.goodsArray[0].type_of_goods).toLocaleLowerCase() + '/' + id]);
  }

}
