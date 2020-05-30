import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseModel} from '../../../courses/models/Course.model';
import {MainPageService} from '../../services/main-page.service';
import {CommentModel} from '../../../courses/models/Commentar.model';
import {Observable} from 'rxjs';
import {AppService} from '../../../../services/app.service';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  constructor(private route: ActivatedRoute, public mainPageService: MainPageService,
              private appService: AppService) {
  }

  course: CourseModel;
  commentaries: CommentModel[];
  inputCommentValue: string;

  ngOnInit(): void {
    this.route.data
      .subscribe(
        course => (this.course = course.myCourseResolverService,
          this.commentaries = course.myCourseResolverService.commentaries,
          setTimeout(() => this.appService.setRequestStatus(false))),
        err => (
          setTimeout(() => this.appService.setRequestStatus(false)),
            alert(err.error.message))
      );
  }


  sendComment(courseId: number) {
    this.mainPageService.sendComment(courseId, this.inputCommentValue)
      .subscribe(res => (
          this.commentaries[this.commentaries.length] = res,
            setTimeout(() => (
              this.inputCommentValue = '',
                this.appService.setRequestStatus(false)))),
        err => (setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
      );
  }

  deleteComment(commentId: number) {
    this.mainPageService.deleteComment(commentId)
      .subscribe(res => (this.commentaries = this.newListWithoutDeleteComment(this.commentaries, commentId),
          setTimeout(() => this.appService.setRequestStatus(false))),
        err => (setTimeout(() => this.appService.setRequestStatus(false)),
          alert(err.error.message))
      );
  }

  newListWithoutDeleteComment(comentaries: CommentModel[], commentId: number) {
    const newList: CommentModel[] = [];
    for (let i = 0; i < comentaries.length; i++) {
      if (comentaries[i].id !== commentId) {
        newList[i] = comentaries[i];
      }
    }
    return newList;
  }
}
