import { Component, OnInit } from "@angular/core";
import { SignupComponent, isSignOpen } from "../signup/signup.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.css"]
})
export class OtpComponent implements OnInit {
  constructor(
    private login: MatDialog,
    private Auth: AuthService,
    private Toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!sessionStorage.getItem("email")) {
      // window.scroll(0, 0);
      this.Toastr.error("Please first login", "Error", {
        progressBar: true
      });
      this.router.navigate([""]);
    }
  }
  otpevent(event) {
    console.log("Inside otp");
    event.preventDefault();
    const target = event.target;
    var errorList = [];
    var pin = sessionStorage.getItem("otp");
    var name = sessionStorage.getItem("signupname");
    var email = sessionStorage.getItem("signupemail");
    var mn = sessionStorage.getItem("signupmn");
    var pass = sessionStorage.getItem("signuppass");

    const otp = target.querySelector("#otp").value;
    if (otp == pin) {
      this.Auth.otpenterdata(name, email, mn, pass);
    } else {
      this.Toastr.error("Otp Not Matched", "Error", {
        progressBar: true
      });
    }
  }
  onClose() {
    if (isSignOpen) {
      var sign: SignupComponent = new SignupComponent(null, null, null);
      sign.onCloseSign();
    } else {
      this.login.closeAll();
      return;
    }
  }
}
