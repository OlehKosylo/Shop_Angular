import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserInfo} from '../models/UserInfo.model';
import {CourseModel} from '../../courses/models/Course.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {EditUserInfo} from '../../profile-page/models/EditUserInfo.model';
import {CommentModel} from '../../courses/models/Commentar.model';
import {AppService} from '../../../services/app.service';


@Injectable({
  providedIn: 'root'
})

export class MainPageService {
  public userId: string;
  public user: UserInfo;
  public photoURL = 'https://firebasestorage.googleapis.com/v0/b/ottostorage-469ea.appspot.com/o/preViewPhoto.jpg?alt=media&token=301b7a55-6d1b-478d-ab03-adc17980fbcd';


  constructor(private http: HttpClient, private db: AngularFirestore, private router: Router,
              private appService: AppService) {
  }

  getUserInfo(id: string): Observable<UserInfo> {
    this.appService.setRequestStatus(true);
    return this.http.get<UserInfo>('http://localhost:8081/api/main/userInfoForMainPage?userId=' + id)
      .pipe(tap(user => (this.user = user,
        setTimeout(() => this.appService.setRequestStatus(false)) ,
        user.photoURL ? this.photoURL = user.photoURL : '')));
  }

  postCreatedCurs(Course: CourseModel) {
    this.appService.setRequestStatus(true);
    this.http.post<CourseModel>('http://localhost:8081/api/course/create', {...Course})
      .subscribe((m) => {
          setTimeout(() => this.appService.setRequestStatus(false));
        },
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)) ,
            alert(err.error.message)));
  }

  getMyCourses(id: string): Observable<CourseModel[]> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel[]>('http://localhost:8081/api/course/myList?userId=' + id);
  }

  getMyCourse(id: string, userId: string): Observable<CourseModel> {
    this.appService.setRequestStatus(true);
    return this.http.get<CourseModel>(`http://localhost:8081/api/course/myCourse?courseId=${id}&userId=${userId}`);
  }

  editPhotoInProfile(id: number, photoURL: string) {
    this.photoURL = photoURL;
    this.appService.setRequestStatus(true);
    this.http.post<EditUserInfo>('http://localhost:8081/api/main/userEditPhoto', {id, photoURL})
      .subscribe((newUser) => {
          this.user = {...this.user, ...newUser};
          setTimeout(() => this.appService.setRequestStatus(false));
          this.router.navigate(['/main/profile']);
        },
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)),
            alert(err.error.message)));
  }

  sendComment(courseId: number, inputCommentValue: string): Observable<CommentModel> {
    this.appService.setRequestStatus(true);
    return this.http.post<CommentModel>(`http://localhost:8081/api/course/setComment`,
      {courseId, userId: this.getUserId(), text: inputCommentValue});
  }

  deleteComment(commentId: number): Observable<CommentModel[]> {
    this.appService.setRequestStatus(true);
    return this.http.get<CommentModel[]>(`http://localhost:8081/api/course/deleteComment?commentId=${commentId}`);
  }

  public getUserId(): string {
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }

  public getCourseId(): string {
    return sessionStorage.getItem('courseId');
  }

  public navigate(value: string) {
    this.router.navigate([value]);
  }

  public setUser(value) {
    this.user = value;
  }


}
