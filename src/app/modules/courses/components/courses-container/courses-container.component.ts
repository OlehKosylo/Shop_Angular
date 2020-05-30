import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseModel} from '../../models/Course.model';
import {CoursesContainerService} from '../../services/courses-container-service';
import {AppService} from '../../../../services/app.service';


@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.css']
})
export class CoursesContainerComponent implements OnInit {
  courses: CourseModel[] = [];
  genre: string;
  inputSearchValue: string;
  inputPriceValue;
  statusForViewButtonSortByTitle = false;
  statusForViewButtonSortByPrice = false;


  constructor(private activatedRoute: ActivatedRoute, private courseContainerService: CoursesContainerService,
              private router: Router, private appService: AppService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      res => (
        res.coursesContainerResolver ?
          (this.courses = res.coursesContainerResolver,
              (res.coursesContainerResolver[0] !== undefined && (this.genre = res.coursesContainerResolver[0].genre)),
              setTimeout(() => this.appService.setRequestStatus(false))
          ) :
          (this.courses = res.searchCoursesContainerResolverService,
              (res.searchCoursesContainerResolverService[0] !== undefined &&
                (this.genre = res.searchCoursesContainerResolverService[0].genre)),
              setTimeout(() => this.appService.setRequestStatus(false))
          )),
      err => (
        setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
    );
  }

  backClicked() {
    window.history.back();
  }

  sortByTitle(value: boolean) {
    this.setStatusForViewButtonSortByTitle(value);
    this.courseContainerService.sortByTitle(this.statusForViewButtonSortByTitle, this.genre)
      .subscribe(res => {
          this.inputSearchValue = '';
          this.courses = res;
          setTimeout(() => this.appService.setRequestStatus(false));
        },
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)),
            alert(err.error.message))
      );
  }

  sortByPrice(value: boolean) {
    this.setStatusForViewButtonSortByPrice(value);
    this.courseContainerService.sortByPrice(this.statusForViewButtonSortByPrice, this.genre)
      .subscribe(res => {
          this.inputPriceValue = '';
          this.courses = res;
          setTimeout(() => this.appService.setRequestStatus(false));
        },
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)),
            alert(err.error.message)
        )
      );
  }

  getCourseByLimitPrice() {
    this.courseContainerService.getCourseByLimitPrice(this.inputPriceValue, this.genre)
      .subscribe(res => {
          this.courses = res;
          setTimeout(() => this.appService.setRequestStatus(false));
        },
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)),
            alert(err.error.message))
      );
  }

  getAllCourseByGenre() {
    this.courseContainerService.getCourses(this.genre)
      .subscribe(res => {
          this.courses = res;
          setTimeout(() => this.appService.setRequestStatus(false));
        },
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)),
            alert(err.error.message)
        )
      );
  }

  setStatusForViewButtonSortByTitle(value: boolean) {
    this.statusForViewButtonSortByTitle = value;
  }

  setStatusForViewButtonSortByPrice(value: boolean) {
    this.statusForViewButtonSortByPrice = value;
  }

  navigate() {
    this.router.navigate([`/courses/list/${this.genre}/${this.inputSearchValue}/search`]);
  }
}

