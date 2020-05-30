import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../services/registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForma: FormGroup;

  constructor(private formBuilder: FormBuilder, public registrationService: RegistrationService,
              private router: Router) {
    this.registrationForma = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      mail: ['', [Validators.required, Validators.email]],
      name_surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      age: ['', [Validators.required, Validators.min(6), Validators.max(99)]],
      sex: ['', [Validators.required]],
      duplicate_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  ngOnInit(): void {
  }

  postDataForRegistration() {
    this.registrationService.postRequestForRegistration(this.registrationForma.value);
    this.registrationForma.reset();
  }

  navigate() {
    this.router.navigate(['/forgot']);
  }
}
