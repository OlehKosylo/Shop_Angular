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
  public adminMode = false;

  public registrationForma: FormGroup;

  constructor(private formBuilder: FormBuilder, public registrationService: RegistrationService,
              private router: Router) {
    this.registrationForma = formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      age: ['', [Validators.required, Validators.min(6), Validators.max(99)]],
      duplicate_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      passwordForStatus: ['']
    });
  }

  ngOnInit(): void {
  }


  postDataForRegistration() {

    const sendValue = {
      password: this.registrationForma.value.password,
      email: this.registrationForma.value.email,
      name: this.registrationForma.value.name,
      surname: this.registrationForma.value.surname,
      age: this.registrationForma.value.age,
      passwordForStatus: (this.registrationForma.value.passwordForStatus === '' && '12345678'
        || this.registrationForma.value.passwordForStatus)
    };

    this.registrationService.postRequestForRegistration(sendValue);

    this.registrationForma.reset();
  }

  navigate() {
    this.router.navigate(['/forgot']);
  }

  setAdminMode(value) {
    this.adminMode = value;
  }
}
