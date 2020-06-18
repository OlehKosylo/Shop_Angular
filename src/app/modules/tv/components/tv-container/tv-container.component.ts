import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app.service';
import {PreViewTVModel} from '../../models/preViewTV.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-phone-container',
  templateUrl: './tv-container.component.html',
  styleUrls: ['./tv-container.component.css']
})
export class TvContainerComponent implements OnInit {

  tvsArray: PreViewTVModel[] = [];

  constructor(public appService: AppService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.tvsArray = res.tvsResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );

  }

}

