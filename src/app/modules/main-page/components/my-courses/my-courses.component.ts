import {Component, OnInit} from '@angular/core';
import {CourseModel} from '../../../courses/models/Course.model';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../../../../services/app.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  courses: CourseModel[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      courses => (this.courses = courses.myCoursesResolverService,
          setTimeout(() => this.appService.setRequestStatus(false))
      ),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
      );
  }

  setCourseId(value) {
    sessionStorage.setItem('courseId', value);
  }

}
