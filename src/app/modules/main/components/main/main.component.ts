import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../../services/app.service';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  goodsArray: any = [];

  constructor(private router: Router, private route: ActivatedRoute,
              private appService: AppService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      goods => (    console.log(goods),
        this.goodsArray = goods.goodsResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }


}
