import {Component, OnInit} from '@angular/core';
import {PhoneService} from '../../services/phone.service';
import {AppService} from '../../../../services/app.service';
import {PreViewPhoneModel} from '../../models/preViewPhone.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-phone-container',
  templateUrl: './phone-container.component.html',
  styleUrls: ['./phone-container.component.css']
})
export class PhoneContainerComponent implements OnInit {

  phonesArray: PreViewPhoneModel[] = [];

  constructor(private phoneService: PhoneService, private appService: AppService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      phones => (this.phonesArray = phones.phonesResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }

}

