import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent, isLogOpen } from "../login/login.component";
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { SignupComponent, isSignOpen } from "../signup/signup.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public authSub: Subscription;
  public user=''
  public islogged=false
  constructor(private login: MatDialog,private Auth:AuthService) {}
 // status=this.Auth.islogged()
  ngOnInit() {
  this.authSub=this.Auth.getAuthListner()
    .subscribe(data=>{
      this.islogged=data;
    })
     // this.user=sessionStorage.getItem('email')
     //this.Auth.cast.subscribe(status=>this.islogged=status)
     //if(this.user!=null)
     // this.Auth.logUserOut(true)
  }

  onCreate() {
    if (!isLogOpen && !isSignOpen) {
      const matConfig = new MatDialogConfig();
      matConfig.disableClose = true;
      matConfig.autoFocus = true;
      matConfig.panelClass = "custom-dialog-container";
      this.login.open(LoginComponent, matConfig);
    }
    }
    onCreateSign() {
      if (!isLogOpen && !isSignOpen) {
        const matConfig = new MatDialogConfig();
        matConfig.disableClose = true;
        matConfig.autoFocus = true;
        matConfig.panelClass = "custom-dialog-container";
        this.login.open(SignupComponent, matConfig);
      }
    }
    onLogout(){
      sessionStorage.clear();
      this.islogged = false;
  }
}
