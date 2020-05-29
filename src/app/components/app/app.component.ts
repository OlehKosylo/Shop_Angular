import {Component} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public appService: AppService, private router: Router, private location: Location) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      appService.setUserIn(true);
      if (this.location.path().length === 0) {
        router.navigate(['/main']);
      }
    }
  }

  goOut() {
    this.appService.setUserIn(false);
    this.appService.setCardStatus(false);
    localStorage.removeItem('Token');
    localStorage.removeItem('userId');
  }

  navigate() {
    this.router.navigate(['/']);
  }

  activeRoute(path) {
    return path === this.router.url;
  }

}
