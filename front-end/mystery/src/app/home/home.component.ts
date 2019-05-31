import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:Observable<any>;
  constructor(private auth:AuthService, private router: Router) {
      this.user= this.auth.user;
   }

  ngOnInit() {
  }
  logOut(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

}
