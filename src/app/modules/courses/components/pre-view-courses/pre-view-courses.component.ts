import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pre-view-courses',
  templateUrl: './pre-view-courses.component.html',
  styleUrls: ['./pre-view-courses.component.css']
})
export class PreViewCoursesComponent implements OnInit {

  @Input() title;
  @Input() genre;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate([`/courses/list/${this.genre}/${this.title}`]);
  }
}
