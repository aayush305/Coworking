import { Input, Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SignupComponent, isSignOpen } from "../signup/signup.component";

export var isLogOpen: boolean;
var temp;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private login: MatDialog) {
    temp = login;
    isLogOpen = true;
  }
  ngOnInit() {}

  onClose() {
    isLogOpen = false;
    if (isSignOpen) {
      var sign: SignupComponent = new SignupComponent(temp, null, null);
      sign.onCloseSign();
    } else {
      this.login.closeAll();
      return;
    }
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
}
