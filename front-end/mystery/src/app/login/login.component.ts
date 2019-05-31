import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { tap, map, take } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  numberScreen:boolean=true;
  codeScreen:boolean=false;
  codeStatus:string="";
  constructor(private auth:AuthService, private router: Router) { 
    console.log("login constructed");
    this.auth.user.subscribe((user)=>{
      console.log(user);
      if(user){
        console.log("Already Logged in");
        this.router.navigate(['/home']);
      }else{
        console.log("Not logged in");
      }
    });
  }

  ngOnInit() {
  }
  sendNumber(number:string){
    this.auth.sendPhoneNumber(number).subscribe((response)=>{
      console.log(response);
      this.numberScreen=false;
      this.codeScreen=true;
    }); 
  }
  verifyCode(code:string){
    this.auth.sendVerificationCode(code).subscribe((response)=>{
      let status= response.status;
      if(status===1){
        console.log("Valid Code");
        this.codeStatus="Success ✅"
        console.log("Navigating");
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },1500);
      }else if(status===0){
        console.log("Invalid Code");
        this.codeStatus="Invalid code ❌ \n Please try again"
      }
      else{
        console.log("Code Expired");
        this.codeStatus="code has expired"

      }
    })
  }
  
}
