import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent, isLogOpen } from "../login/login.component";
import { OtpComponent } from "../otp/otp.component";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

export var isSignOpen: boolean;
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  model: any = {};
  constructor(
    private login: MatDialog,
    private Auth: AuthService,
    private Toastr: ToastrService
  ) {
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
    sessionStorage.setItem("signupname", name);
    sessionStorage.setItem("signupemail", email);
    sessionStorage.setItem("signupmn", mn);
    sessionStorage.setItem("signuppass", pass);
    sessionStorage.setItem("signupcpass", cpass);

    if (pass === cpass) {
      console.log("inside popup");

      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        // Do something before delay
        console.log("before delay");
        this.Auth.signUpData(name, email, mn, pass);
        await delay(1000);

        // Do something after
        console.log("after delay");
        if (sessionStorage.getItem("emailregister") == "false") {
          const matConfig = new MatDialogConfig();
          matConfig.disableClose = true;
          matConfig.autoFocus = true;
          matConfig.panelClass = "custom-dialog-container";
          this.login.open(OtpComponent, matConfig);
        } else {
          console.log("already exist");
        }
      })();
    } else {
      this.Toastr.error("Password and Confirm Password Must match", "Error", {
        progressBar: true
      });
    }
  }

  onCloseSign() {
    isSignOpen = false;
    if (isLogOpen) {
      var logc: LoginComponent = new LoginComponent(this.login, null, null);
      logc.revIsLogOpen();
    }
    this.login.closeAll();
    return;
  }
  revIsSignOpen() {
    isSignOpen = !isSignOpen;
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
