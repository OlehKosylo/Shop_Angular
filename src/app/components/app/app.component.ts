import {Component} from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public appService: AppService) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      appService.setUserIn(true);
    }
  }

  goOut() {
    this.appService.setUserIn(false);
    // localStorage.removeItem('Token');
    // localStorage.removeItem('userId');
  }

  refresh() {
    this.appService.refreshTokens();
  }

}
