import {Component, OnInit} from '@angular/core';
import {StripeService} from '../../../Stripe/stripe.service';
import {MainPageService} from '../../../main-page/services/main-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseModel} from '../../models/Course.model';
import {AppService} from '../../../../services/app.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: CourseModel;
  statusBankCardComponent = false;

  constructor(public stripeService: StripeService, public mainPageService: MainPageService,
              public router: Router, private activatedRoute: ActivatedRoute,
              private appService: AppService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res =>
        (this.course = res.courseResolverService,
            setTimeout(() => this.appService.setRequestStatus(false))
        ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message)));
  }

  navigate() {
    sessionStorage.setItem('courseId', String(this.course.id));
    this.router.navigate([`/main/my-courses/${this.course.title}`]);
  }

  setStatusBankCardComponent(value: boolean) {
    if (value) {
      sessionStorage.setItem('courseId', String(this.course.id));
    }
    this.statusBankCardComponent = value;
  }

  backClicked() {
    window.history.back();
  }
}
