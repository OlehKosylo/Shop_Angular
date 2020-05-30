import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../services/app.service';
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

  constructor(private formBuilder: FormBuilder, public loginService: LoginService,
              public appService: AppService, private router: Router) {
    this.loginForma = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.postRequestForLogin(this.loginForma.value).subscribe(
      message => {
        const decodedAccessToken = this.appService.getDecodedAccessToken(message.accessToken);
        localStorage.setItem('userId', decodedAccessToken.sub);

        localStorage.setItem('Token', message.tokenType + ' ' + message.accessToken);
        this.router.navigate(['main']);
        this.appService.setUserIn(true);
      },
      error => {
        this.error = error;
      }
    );
  }

  navigate() {
    this.router.navigate(['/forgot']);
  }

}
