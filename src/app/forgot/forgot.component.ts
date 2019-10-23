import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private login:MatDialog,private Auth:AuthService) { }

  ngOnInit() {
  }

  onemailEnter(event){
    event.preventDefault();
    const target = event.target;
    var errorList = [];

    const email = target.querySelector("#e").value;
    console.log("inside email enter:"+email)
    this.Auth.sendmail(email);
  }

  onClose() {
    this.login.closeAll();
  }

}
