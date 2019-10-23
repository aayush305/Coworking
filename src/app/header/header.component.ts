import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent, isLogOpen } from "../login/login.component";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { SignupComponent, isSignOpen } from "../signup/signup.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public authSub: Subscription;
  public adminSub: Subscription;
  public user = "";
  public islogged = false;
  public isAdmin: boolean;
  constructor(
    private login: MatDialog,
    private Auth: AuthService,
    private router: Router
  ) {
    this.authSub = this.Auth.getAuthListner().subscribe(data => {
      this.islogged = data;
    });
    this.adminSub = this.Auth.getAdminListner().subscribe(isAdm => {
      this.isAdmin = isAdm;
    });
  }
  // status=this.Auth.islogged()
  ngOnInit() {
    if (sessionStorage.getItem("admin")) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.islogged = this.Auth.getAuthStatus();
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
  onLogout() {
    sessionStorage.clear();
    this.islogged = false;
    this.router.navigate([""]);
  }
}
