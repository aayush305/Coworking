import { Input, Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AuthService } from "../auth.service";
import { SignupComponent, isSignOpen } from "../signup/signup.component";
import { ForgotComponent} from "../forgot/forgot.component";
import {Router} from "@angular/router"

export var isLogOpen: boolean;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private login: MatDialog, private Auth: AuthService,private router:Router) {
    isLogOpen = true;
  }
  ngOnInit() {}

  loginevent(event) {
    console.log("e click");
    event.preventDefault();
    const target = event.target;
    var errorList = [];

    const email = target.querySelector("#email").value;

    const password = target.querySelector("#password").value;

    if (errorList.length === 0) {
      this.Auth.loginuser(email, password);
      this.onClose();
    }
  }

  onClose() {
    isLogOpen = false;
    if (isSignOpen) {
      var sign: SignupComponent = new SignupComponent(this.login, null, null);
      sign.revIsSignOpen();
    }
    this.login.closeAll();
    return;
  }

  revIsLogOpen() {
    isLogOpen = !isLogOpen;
  }

  onCreateSign() {
    if (isLogOpen && !isSignOpen) {
      const matConfig = new MatDialogConfig();
      matConfig.disableClose = true;
      matConfig.autoFocus = true;
      matConfig.panelClass = "custom-dialog-container";
      this.login.open(SignupComponent, matConfig);
    }
  }


  onForgot()
  {
    this.login.closeAll();
    this.router.navigate(["./forgot"])
  }
}
