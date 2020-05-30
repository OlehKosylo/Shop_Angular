import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activate-mail',
  templateUrl: './activate-mail.component.html',
  styleUrls: ['./activate-mail.component.css']
})
export class ActivateMailComponent implements OnInit {

  constructor(public appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.activateAccount();
    setTimeout(() => {
      window.close();
    }, 1000);

  }
}
