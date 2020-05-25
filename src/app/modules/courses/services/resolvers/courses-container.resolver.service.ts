import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseModel} from '../../models/Course.model';
import {CoursesContainerService} from '../courses-container-service';

@Injectable()
export class CoursesContainerResolverService implements Resolve<CourseModel[]> {
  constructor(private coursesContainerService: CoursesContainerService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CourseModel[]> {
    const searchTerm: string = route.paramMap.get('genre');

    return this.coursesContainerService.getCourses(searchTerm);
  }
}
