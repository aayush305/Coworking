import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private login: MatDialog) {}

  ngOnInit() {}

  onCreate() {
    const matConfig = new MatDialogConfig();
    matConfig.disableClose = true;
    matConfig.autoFocus = true;
    matConfig.panelClass = "custom-dialog-container";
    this.login.open(LoginComponent, matConfig);
  }
}
