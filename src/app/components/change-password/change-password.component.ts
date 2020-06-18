import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activate-mail',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.changePassword();
    setTimeout(() => {
      window.close();
    }, 1000);

  }
}
