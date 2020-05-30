import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilePageService} from '../../services/profile-page.service';

@Component({
  selector: 'app-profile-page-edit',
  templateUrl: './profile-page-edit.component.html',
  styleUrls: ['./profile-page-edit.component.css']
})
export class ProfilePageEditComponent implements OnInit {
  public editForma: FormGroup;

  constructor(private formBuilder: FormBuilder, public profilePageService: ProfilePageService) {
    const {age, name_surname, sex} = profilePageService.user;
    this.editForma = formBuilder.group({
      name_surname: [name_surname, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      age: [age, [Validators.required, Validators.min(6), Validators.max(99)]],
      sex: [sex, [Validators.required]],
      password: ['', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      duplicate_password: ['', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  ngOnInit(): void {
  }

  editUser() {
    const id = this.profilePageService.user.id;
    this.profilePageService.editUserInfo({id, ...this.editForma.value});
    this.editForma.reset();
  }

}
