import {Component, OnInit} from '@angular/core';
import {ForgotPasswordService} from '../../service/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;

  constructor(private forgotPassService: ForgotPasswordService) {
  }

  ngOnInit(): void {
  }

  postEmail() {
    this.forgotPassService.postEmailForCheckValid(this.email);
  }
}
