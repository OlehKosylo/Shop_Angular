import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseModel} from '../../../courses/models/Course.model';
import {MainPageService} from '../../services/main-page.service';
import {CommentModel} from '../../../courses/models/Commentar.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  constructor(private route: ActivatedRoute, public mainPageService: MainPageService) {
  }

  course: CourseModel;
  commentaries: CommentModel[];
  inputCommentValue: string;

  ngOnInit(): void {
    this.route.data
      .subscribe(
        course => (this.course = course.myCourseResolverService,
          this.commentaries = course.myCourseResolverService.commentaries),
        err => alert('Something went wrong. Please try again')
      );
  }


  sendComment(courseId: number) {
    this.mainPageService.sendComment(courseId, this.inputCommentValue)
      .subscribe(res => (
          this.commentaries[this.commentaries.length] = res),
        err => alert('Something went wrong. Please try again')
      );
  }

  deleteComment(commentId: number) {
    this.mainPageService.deleteComment(commentId)
      .subscribe(res => this.commentaries = this.newListWithoutDeleteComment(this.commentaries, commentId),
        err => alert('Something went wrong. Please try again')
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
