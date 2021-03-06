import {Component} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public appService: AppService, public router: Router) {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      appService.setUserIn(true);
      appService.setUserId(+userId);
    }

    if (appService.userIn) {
      this.appService.getUserStatus().subscribe(
        res => res === 'ADMIN' && (this.appService.adminStatus = true)
      );
    }
  }

  goOut() {
    this.appService.setUserIn(false);
    this.appService.logout();
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  }

  navigate(value: string) {
    this.router.navigate([value]);
  }


}
