import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseModel} from '../../models/Course.model';
import {CoursesContainerService} from '../courses-container-service';
import {filter, map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class SearchCoursesContainerResolverService implements Resolve<CourseModel[]> {
  constructor(private coursesContainerService: CoursesContainerService, private route: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CourseModel[]> {
    const searchTerm: string = route.paramMap.get('title');
    return this.coursesContainerService.searchCourses(searchTerm);
  }
}
