import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../services/app.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private appService: AppService, private router: Router) {
  }

  // getAllProducts() {
  //   this.appService.setRequestStatus(true);
  //   this.http.get<any>()
  //     .subscribe(
  //       message => {},
  //       error => {
  //         alert(error.error.message);
  //         this.appService.setRequestStatus(false);
  //       }
  //     );
  // }

}


