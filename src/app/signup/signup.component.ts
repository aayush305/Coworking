import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent, isLogOpen } from "../login/login.component";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

export var isSignOpen: boolean;
var temp;
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(
    private login: MatDialog,
    private Auth: AuthService,
    private Toastr: ToastrService
  ) {
    temp = login;
    isSignOpen = true;
  }
  ngOnInit() {}

  signUpDataEntry(event) {
    console.log("Inside signUpDataEntry");
    event.preventDefault();
    const target = event.target;
    var errorList = [];

    const name = target.querySelector("#username").value;

    const email = target.querySelector("#mail").value;

    const mn = target.querySelector("#cont").value;

    const pass = target.querySelector("#pass").value;

    const cpass = target.querySelector("#copass").value;

    if (pass === cpass) {
      if (errorList.length === 0) this.Auth.signUpData(name, email, mn, pass);
    } else {
      this.Toastr.error("Password and Confirm Password Must match", "Error", {
        progressBar: true
      });
    }
  }

  onCloseSign() {
    isSignOpen = false;
    if (isLogOpen) {
      var logc: LoginComponent = new LoginComponent(temp,null);
      logc.onClose();
    } else {
      this.login.closeAll();
      return;
    }
  }

  onCreate() {
    if (!isLogOpen && isSignOpen) {
      const matConfig = new MatDialogConfig();
      matConfig.disableClose = true;
      matConfig.autoFocus = true;
      matConfig.panelClass = "custom-dialog-container";
      this.login.open(LoginComponent, matConfig);
    }
  }
}
