import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MainPageService} from '../main-page.service';
import {CourseModel} from '../../../courses/models/Course.model';


@Injectable()
export class MyCoursesResolverService implements Resolve<CourseModel[]> {
  constructor(private mainPageService: MainPageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseModel[]> {
    const id = localStorage.getItem('userId');
    return this.mainPageService.getMyCourses(id);
  }
}
