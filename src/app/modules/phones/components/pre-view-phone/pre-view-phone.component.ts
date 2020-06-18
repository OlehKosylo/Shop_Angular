import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PreViewPhoneModel} from '../../../phones/models/preViewPhone.model';


@Component({
  selector: 'app-pre-view-phone',
  templateUrl: './pre-view-phone.component.html',
  styleUrls: ['./pre-view-phone.component.css']
})
export class PreViewPhoneComponent implements OnInit {

  @Input() phonesArray: PreViewPhoneModel[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navigate(id: number) {
    this.router.navigate([(this.phonesArray[0].type_of_goods).toLocaleLowerCase() + '/' + id]);
  }
}
