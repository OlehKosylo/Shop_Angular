import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CourseModel} from '../models/Course.model';
import {HttpClient} from '@angular/common/http';
import {IdUserCoursRequestModel} from '../models/IdUserCoursRequest.model';
import {MainPageService} from '../../main-page/services/main-page.service';
import {AppService} from '../../../services/app.service';

@Injectable({
  providedIn: 'root'
})

export class CoursesContainerService {

  constructor(private http: HttpClient, private mainPageService: MainPageService, private appService: AppService) {
  }

  getCourses(genre: string): Observable<CourseModel[]> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel[]>(`http://localhost:8081/api/course/list?genre=${genre}`);
  }

  getCourse(title: string): Observable<CourseModel> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel>(`http://localhost:8081/api/course/getCourse?title=${title}
    &userId=${this.mainPageService.getUserId()}`);
  }

  searchCourses(title: string): Observable<CourseModel[]> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel[]>(`http://localhost:8081/api/course/searchCourse?title=${title}`);
  }

  setBoughtCourse() {
    this.appService.setRequestStatus(true);
    return this.http.post<IdUserCoursRequestModel>('http://localhost:8081/api/course/setBoughtCourse',
      {userId: this.mainPageService.getUserId(), courseId: this.getCourseId()}).subscribe(
      res => {
        setTimeout(() => this.appService.setRequestStatus(false));
      },
      err => {
        setTimeout(() => this.appService.setRequestStatus(false));
        alert(err.error.message);
      }
    );
  }

  getCourseId() {
    return sessionStorage.getItem('courseId');
  }

  sortByTitle(statusForSort: boolean, genre: string): Observable<CourseModel[]> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel[]>(`http://localhost:8081/api/course/listByTitle?genre=${genre}&statusForSort=${statusForSort}`);
  }

  sortByPrice(statusForSort: boolean, genre: string): Observable<CourseModel[]> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel[]>(`http://localhost:8081/api/course/listByPrice?genre=${genre}&statusForSort=${statusForSort}`);
  }

  getCourseByLimitPrice(inputPriceValue: number, genre: string): Observable<CourseModel[]> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel[]>(`http://localhost:8081/api/course/listByLimitPrice?genre=${genre}&price=${inputPriceValue}`);
  }
}
