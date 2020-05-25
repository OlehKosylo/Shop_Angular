import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseModel} from '../../models/Course.model';
import {CoursesContainerService} from '../../services/courses-container-service';


@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.css']
})
export class CoursesContainerComponent implements OnInit {
  courses: CourseModel[] = [];
  inputSearchValue: string;
  statusForViewButtonSortByTitle = false;
  statusForViewButtonSortByPrice = false;
  inputPriceValue: number;


  constructor(private activatedRoute: ActivatedRoute, private courseContainerService: CoursesContainerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      res => (
        res.coursesContainerResolver ?
          this.courses = res.coursesContainerResolver :
          this.courses = res.searchCoursesContainerResolverService
      ),
      err => (alert('Something went wrong. Please try again'))
    );
  }

  backClicked() {
    window.history.back();
  }

  sortByTitle(value: boolean) {
    this.setStatusForViewButtonSortByTitle(value);
    this.courseContainerService.sortByTitle(this.statusForViewButtonSortByTitle, this.courses[0].genre)
      .subscribe(res => {
          this.courses = res;
        },
        err => (alert('Something went wrong. Please try again'))
      );
  }

  sortByPrice(value: boolean) {
    this.setStatusForViewButtonSortByPrice(value);
    this.courseContainerService.sortByPrice(this.statusForViewButtonSortByPrice, this.courses[0].genre)
      .subscribe(res => {
          this.courses = res;
        },
        err => (alert('Something went wrong. Please try again'))
      );
  }

  getCourseByLimitPrice() {
    this.courseContainerService.getCourseByLimitPrice(this.inputPriceValue, this.courses[0].genre)
      .subscribe(res => {
          this.courses = res;
        },
        err => (alert('Something went wrong. Please try again'))
      );
  }

  getAllCourseByGenre() {
    this.courseContainerService.getCourses(this.courses[0].genre)
      .subscribe(res => {
          this.courses = res;
        },
        err => (alert('Something went wrong. Please try again'))
      );
  }

  setStatusForViewButtonSortByTitle(value: boolean) {
    this.statusForViewButtonSortByTitle = value;
  }

  setStatusForViewButtonSortByPrice(value: boolean) {
    this.statusForViewButtonSortByPrice = value;
  }
}

