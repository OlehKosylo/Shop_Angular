import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {TvService} from '../../services/tv.service';

@Component({
  selector: 'app-phone-container',
  templateUrl: './tv-container.component.html',
  styleUrls: ['./tv-container.component.css']
})
export class TvContainerComponent implements OnInit {

  price: number;

  constructor(public appService: AppService, private route: ActivatedRoute, public tvService: TvService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      res => (this.tvService.tvsArray = res.tvsResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );
  }

  sortByASC() {
    this.tvService.sortByASC();
  }

  sortByDESC() {
    this.tvService.sortByDESC();
  }

  sortByPrice() {
    this.tvService.sortByPrice(this.price);
  }
}

