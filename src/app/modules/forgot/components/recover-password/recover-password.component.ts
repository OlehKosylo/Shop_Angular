import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ForgotPasswordService} from '../../service/forgot-password.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  public recoverPassForm: FormGroup;

  userId: string;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, public forgotPassword: ForgotPasswordService) {
    this.recoverPassForm = formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      duplicate_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params.userId;
      const token = params.token;
      this.forgotPassword.postTokenForCheckValid(token, this.userId);
    });
  }

  postDataForRecoverPass() {
    this.forgotPassword.postDataForRecoverPass(this.recoverPassForm.value, this.userId);
  }
}
