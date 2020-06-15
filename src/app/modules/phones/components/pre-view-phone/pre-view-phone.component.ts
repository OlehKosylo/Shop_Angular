import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pre-view-phone',
  templateUrl: './pre-view-phone.component.html',
  styleUrls: ['./pre-view-phone.component.css']
})
export class PreViewPhoneComponent implements OnInit {

  @Input() id;
  @Input() title;
  @Input() price;
  @Input() description;
  @Input() imageURL;
  @Input() typeOfGoods;

  constructor() {
  }

  ngOnInit(): void {
  }

}