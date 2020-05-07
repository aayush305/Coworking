import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  constructor(private login:MatDialog,private Auth:AuthService) { }

  ngOnInit() {
  }
  
  onenewpassEnter(event){
    event.preventDefault();
    const target = event.target;
    var errorList = [];

    const ne = target.querySelector("#np").value;
    this.Auth.setnewpassword(ne);
  }
  onClose() {
    this.login.closeAll();
  }
}
