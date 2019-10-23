import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";
import { NewpasswordComponent } from '../newpassword/newpassword.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgotmail',
  templateUrl: './forgotmail.component.html',
  styleUrls: ['./forgotmail.component.css']
})
export class ForgotmailComponent implements OnInit {

  constructor(private login:MatDialog,private Auth:AuthService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
  }

  onVerify(event)
  {
    event.preventDefault();
    const target = event.target;
    var errorList = [];

    const otp = target.querySelector("#otp").value;
    console.log(sessionStorage.getItem("otpforgot"));
    console.log(otp);
   if(sessionStorage.getItem("otpforgot")==otp)
    {
      this.toastr.success("OTP matched", "success", {
        progressBar: true
      });
      // const matConfig = new MatDialogConfig();
      // matConfig.disableClose = true;
      // matConfig.autoFocus = true;
      // matConfig.panelClass = "custom-dialog-container";
      // this.login.open(NewpasswordComponent, matConfig);
      this.router.navigate(["/newpassword"]);
    }
    else{
      this.toastr.error("OTP not matched", "error", {
        progressBar: true
      });
    }
  }
  
  onClose() {
    this.login.closeAll();
  }
}
