import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public error: any;
  public url: any = '/main';

  public loginForma: FormGroup;

  constructor(private formBuilder: FormBuilder, public loginService: LoginService, private router: Router) {
    this.loginForma = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  ngOnInit(): void {

  }

  login() {
    this.loginService.postRequestForLogin(this.loginForma.value);
  }

  navigate() {
    this.router.navigate(['/forgot']);
  }

}
