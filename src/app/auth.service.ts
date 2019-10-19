import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { HeaderComponent } from "./header/header.component";
import { Subject } from "rxjs";
import { isNull } from "@angular/compiler/src/output/output_ast";

export interface userdata {
  email: string;
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  public email;
  public isLogged;
  public authListner = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private Toastr: ToastrService,
    private login: MatDialog
  ) {}

  requestvisit(name, email, mn) {
    this.http
      .post("http://localhost:8000/requestvisit", { name, email, mn })
      .subscribe(
        (response: any) => {
          if (response.emailregister) {
            this.Toastr.error("Already Request Visited", "Error", {
              progressBar: true
            });
          }
          if (response.isSucceed) {
            this.Toastr.success(
              "Thanks for " + name + " request visit",
              "Success",
              { progressBar: true }
            );

            //this.router.navigate(['/login']);
          }
        },
        (error: any) => {
          if (error.isSucceed === "false") {
            this.Toastr.error("Something went wrong", "Error");

            console.log("Error");
          }
        }
      );
  }
  /*logUserOut(status)
      {
        this.isLogged.next(status)
      }*/

  getAuthListner() {
    return this.authListner.asObservable();
  }

  getAuthStatus(): boolean {
    return sessionStorage.getItem("email") != null;
  }

  bookArea(reqSeat: Number, reqMonth: Number) {
    console.log("Inside bookArea");
    var data = JSON.parse(sessionStorage.getItem("fetchData"));
    var uid = sessionStorage.getItem("email");
    this.http
      .post("http://localhost:8000/bookarea", { reqSeat, reqMonth, data, uid })
      .subscribe((res: any) => {
        if (res.insert && res.update) {
          console.log("Success in bookArea");
        } else {
          console.log("Something wrong in bookArea");
        }
      });
  }

  getAreaDetail(areaName: string) {
    console.log("Inside getAreaDetail");
    this.http
      .post("http://localhost:8000/findarea", { areaName })
      .subscribe((res: any) => {
        console.log("my response" + JSON.stringify(res));
        //console.log("my response"+res.isLogin)
        if (res.isFetch) {
          this.authListner.next(true);
          ///console.log(res.userd)
          console.log("Fetched Data:" + JSON.stringify(res.fatchData));
          var check = sessionStorage.getItem("fetchData");
          if (check != null) {
            sessionStorage.removeItem("fetchData");
          }
          sessionStorage.setItem("fetchData", JSON.stringify(res.fatchData));

          // this.isLogged.next(true)
          // this.Toastr.success("Logging You In", "Correct");
          // this.login.closeAll();
          // var refresh : HeaderComponent = new HeaderComponent(null,this);
          // refresh.ngOnInit();
        }
        if (!res.isFetch) {
          this.Toastr.error("Sorry Something Went wrong!", "Error");
          //          console.log('Error');
        }
      });
  }

  loginuser(email, password) {
    console.log("b click");

    this.http
      .post("http://localhost:8000/login", { email, password })
      .subscribe((res: any) => {
        //  console.log("my response"+res)
        //console.log("my response"+res.isLogin)
        if (res.isLogin) {
          this.authListner.next(true);
          ///console.log(res.userd)
          console.log("email from service:" + res.userd["email"]);
          sessionStorage.setItem("email", res.userd["email"]);
          // this.isLogged.next(true)
          this.Toastr.success("Logging You In", "Correct");
          this.login.closeAll();
          // var refresh : HeaderComponent = new HeaderComponent(null,this);
          // refresh.ngOnInit();
        }
        if (!res.isLogin) {
          this.Toastr.error("Invalid login credentials", "Error");
          //          console.log('Error');
        }
      });
  }

  signUpData(name, email, mn, pass) {
    console.log("Inside signUpData Auth service");
    this.http
      .post("http://localhost:8000/signupdata", { name, email, mn, pass })
      .subscribe(
        (response: any) => {
          if (response.emailregister) {
            this.Toastr.error("Email id already exist", "Error", {
              progressBar: true
            });
          }
          if (response.isSucceed) {
            this.Toastr.success("Signed Up! Ready for Login", "Success", {
              progressBar: true
            });

            //this.router.navigate(['/login']);
          }
        },
        (error: any) => {
          if (error.isSucceed === "false") {
            this.Toastr.error("Something went wrong", "Error");

            console.log("Error-->");
          }
        }
      );
  }
}
