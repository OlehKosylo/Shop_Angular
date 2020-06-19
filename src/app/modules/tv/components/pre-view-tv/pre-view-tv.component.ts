import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TvService} from '../../services/tv.service';
import {AppService} from '../../../../services/app.service';

@Component({
  selector: 'app-pre-view-tv',
  templateUrl: './pre-view-tv.component.html',
  styleUrls: ['./pre-view-tv.component.css']
})
export class PreViewTvComponent implements OnInit {

  @Input() tvsArray;

  constructor(private router: Router, public tvService: TvService, public appService: AppService) { }

  ngOnInit(): void {
  }

  navigate(id: number) {
    this.router.navigate([(this.tvsArray[0].type_of_goods).toLocaleLowerCase() + '/' + id]);
  }

  deleteTV(id: number) {
    this.tvService.deleteTV(id);
  }

}
