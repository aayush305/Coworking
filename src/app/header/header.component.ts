import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent, isLogOpen } from "../login/login.component";
import { SignupComponent, isSignOpen } from "../signup/signup.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private login: MatDialog) {}

  ngOnInit() {}

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
}
