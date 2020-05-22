import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserInfo} from '../models/UserInfo.model';
import {UserModel} from '../../registration/models/User.model';
import {CourseModel} from '../../courses/models/Course.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {EditUserInfo} from '../../profile-page/models/EditUserInfo.model';


@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  public userId;
  public user: UserInfo;
  photoURL = 'https://firebasestorage.googleapis.com/v0/b/ottostorage-469ea.appspot.com/o/users%2Fphotos%2FprofilePhoto.jpg?alt=media&token=68df634b-7116-4097-ba83-49fd5ee90f4e';


  constructor(private http: HttpClient, private db: AngularFirestore, private router: Router) {
  }

  getUserInfo(id): Observable<UserInfo> {
    return this.http.get<UserInfo>('http://localhost:8081/api/main/userInfoForMainPage?userId=' + id)
      .pipe(tap(user => (this.user = user, user.photoURL ? this.photoURL = user.photoURL : '')));
  }

  postCreatedCurs(Course) {
    this.http.post<CourseModel>('http://localhost:8081/api/course/create', {...Course})
      .subscribe((m) => {
          console.log(m);
        },
        err => alert('Something went wrong. Please try again'));
  }

  getMyCourses(id): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>('http://localhost:8081/api/course/myList?userId=' + id);
  }

  getMyCourse(id): Observable<CourseModel> {
    return this.http.get<CourseModel>('http://localhost:8081/api/course/myCourse?courseId=' + id);
  }

  editPhotoInProfile(id, photoURL) {
    this.photoURL = photoURL;
    this.http.post<EditUserInfo>('http://localhost:8081/api/main/userEditPhoto', {id, photoURL})
      .subscribe((newUser: EditUserInfo) => {
          this.user = {...this.user, ...newUser};
          this.router.navigate(['/main']);
        },
        err => alert('Something went wrong. Please try again'));
  }


  public getUserId(): string {
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }

  public getCourseId(): string {
    return sessionStorage.getItem('courseId');
  }

  public navigate(value) {
    this.router.navigate([value]);
  }

  public setUser(value) {
    this.user = value;
  }


}
