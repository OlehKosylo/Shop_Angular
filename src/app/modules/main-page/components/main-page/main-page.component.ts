import {Component, OnInit} from '@angular/core';
import {MainPageService} from '../../services/main-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../../services/app.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public mainPageService: MainPageService, private activatedRoute: ActivatedRoute,
              private router: Router, private appService: AppService) {

  }

  ngOnInit(): void {
    this.mainPageService.getUserId();
    if (this.activatedRoute.snapshot.data.mainPageResolverService.stripe_card_id != null) {
      this.appService.setCardStatus(true);
    }
  }


}
