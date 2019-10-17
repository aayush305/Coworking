import { Input, Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

export var isLogOpen: boolean;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private login: MatDialog) {
    isLogOpen = true;
  }
  ngOnInit() {}

  onClose() {
    isLogOpen = false;
    this.login.closeAll();
  }
}
