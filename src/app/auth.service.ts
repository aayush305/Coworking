import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { Subject, BehaviorSubject } from "rxjs";

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
  public adminListner = new Subject<boolean>();

  public bookingData = new BehaviorSubject<any>("");
  public bookingCast = this.bookingData.asObservable();

  public editingData = new BehaviorSubject<any>("");
  public editingCast = this.editingData.asObservable();

  public myAreaDetail = new BehaviorSubject<any>("");
  public myAreaDetailData = this.myAreaDetail.asObservable();

  cast: any;
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
  getAdminListner() {
    return this.adminListner.asObservable();
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
        if (res.inser) {
          console.log("update response----->" + res.update);
          console.log("Success in bookArea");
          sessionStorage.removeItem("fetchData");
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
          this.bookingData.next(res);
          this.editingData.next(res);
          ///console.log(res.userd)
          console.log("Fetched Data:" + JSON.stringify(res.fatchData));
          // var check = sessionStorage.getItem("fetchData");
          // check = JSON.parse(check);
          // console.log("--->" + this.check.name);
          // sessionStorage.setItem("fetchDataname", this.check.name);
          // if (check != null) {
          //   sessionStorage.removeItem("fetchData");
          // }
          sessionStorage.setItem("fetchData", JSON.stringify(res.fatchData));
        }
        if (!res.isFetch) {
          // this.Toastr.error("Sorry Something Went wrong!", "Error");
          console.log("Error in get area detail");
        }
      });
  }

  loginuser(email, password) {
    // console.log("b click");

    this.http
      .post("http://localhost:8000/login", { email, password })
      .subscribe((res: any) => {
        if (res.isLogin) {
          this.authListner.next(true);
          console.log("email from service:" + res.userd["email"]);
          if (res.userd.isAdmin) {
            this.adminListner.next(true);
            sessionStorage.setItem("admin", "true");
            sessionStorage.setItem("email", res.userd["email"]);
            this.Toastr.success(
              "Welcome Admin " + res.userd.name + "!",
              "Correct"
            );
          } else {
            this.adminListner.next(false);
            sessionStorage.setItem("email", res.userd["email"]);
            this.Toastr.success(
              "Welcome back " + res.userd.name + "!",
              "Correct"
            );
          }
        }
        if (!res.isLogin) {
          this.Toastr.error("Invalid login credentials", "Error");
        }
      });
  }
  public ootp;
  public check;
  signUpData(name, email, mn, pass) {
    console.log("Inside signUpData Auth service");
    console.log(email);
    this.http
      .post("http://localhost:8000/signupdata", { name, email, mn, pass })
      .subscribe(
        (res: any) => {
          console.log("inside signup auth" + res.emailregister);
          if (res.emailregister) {
            sessionStorage.setItem("emailregister", res.emailregister);
            this.Toastr.error("Email id already exist", "Error", {
              progressBar: true
            });
          } else {
            this.ootp = res.otp;
            console.log("OTP by service" + this.ootp);
            sessionStorage.setItem("otp", res.otp);
            if (res.isSucceed) {
              this.check = true;
              sessionStorage.setItem("check", this.check);
              sessionStorage.setItem("emailregister", res.emailregister);
              this.Toastr.success("mail is send succesfully", "Success", {
                progressBar: true
              });
            }
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

  otpenterdata(name, email, mn, pass) {
    console.log("Inside signUpData Auth service");

    this.http
      .post("http://localhost:8000/registerdata", { name, email, mn, pass })
      .subscribe(
        (response: any) => {
          if (response.emailregister) {
            this.Toastr.error("Email id already exist", "Error", {
              progressBar: true
            });
          } else {
            if (response.isSucceed) {
              this.Toastr.success("Signed Up! Ready for Login", "Success", {
                progressBar: true
              });
              sessionStorage.clear();

              //this.router.navigate(['/login']);
            }
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
  
  sendmail(e){
    console.log("inside auth sendemail");
    this.http
      .post("http://localhost:8000/sendmail", {e})
      .subscribe(
        (res: any) => {
         
           if(res.is)
            {
              this.Toastr.success("OTP is send", "success", {
                progressBar: true
              });
            sessionStorage.setItem("forgotmail", e);
            
            sessionStorage.setItem("otpforgot", res.code);
            this.router.navigate(["/forgotmail"]);
            }
          
          else{
            this.Toastr.error("otp not send", "eroor", {
              progressBar: true
            });
          }
        })
}
  setnewpassword(np)
  {
    console.log("inside auth setnewpassword");
    console.log(np)
    var ne=sessionStorage.getItem("forgotmail")
    this.http
      .post("http://localhost:8000/setnewpassword", {np,ne})
      .subscribe(
        (response: any) => {
          if (response.newpass) {
            this.Toastr.success("Password succesfully change", "success", {
              progressBar: true
            });
            this.router.navigate([""]);
          }
          else{
            this.Toastr.error("password not change", "eroor", {
              progressBar: true
            });
            this.router.navigate([""]);
          }
  })

  }

  removebooking(id) {
    console.log("Inside removebooking Auth service");
    // console.log(email);
    this.http
      .post("http://localhost:8000/remove", { id })
      .subscribe((res: any) => {
        if (res.removebook) {
          this.Toastr.success("Booking Successfully Deleted", "Success", {
            progressBar: true
          });
          this.router.navigate([""]);
        } else {
          this.Toastr.error("Something went wrong", "Error");
        }
      });
  }

  finddetail(email) {
    console.log("Inside finddetail Auth service");

    return this.http.post("http://localhost:8000/finddetail", { email });
  }

  findAllReq() {
    console.log("Inside findAllReq Auth service");

    return this.http.get("http://localhost:8000/getallreq");
  }

  editArea(areaName, reqSeat, reqAmount, reqDescr) {
    console.log("Inside editArea Auth service");

    this.http
      .post("http://localhost:8000/editarea", {
        areaName,
        reqSeat,
        reqAmount,
        reqDescr
      })
      .subscribe((res: any) => {
        console.log("view in service-->" + JSON.stringify(res));
        if (res.update) {
          this.Toastr.success("Area Data Successfully Updated", "Success", {
            progressBar: true
          });
        }
      });
  }

  findDetailByArea(area) {
    console.log("Inside findDetailByArea Auth service");

    return this.http
      .post("http://localhost:8000/finddetailbyarea", { area })
      .subscribe((res: any) => {
        this.myAreaDetail.next(res);
        console.log("view in service-->" + JSON.stringify(res));
      });
  }

  editbooking(editemail, editid, editseat, editmonth) {
    console.log("inside auth edit");
    this.http
      .post("http://localhost:8000/editdetail", {
        editemail,
        editid,
        editseat,
        editmonth
      })
      .subscribe((res: any) => {
        if (res.updatebooking) {
          this.Toastr.success("Booking Successfully updated", "Success", {
            progressBar: true
          });
          this.router.navigate(["/viewdetail"]);
        } else {
          this.Toastr.error("Booking not updated", "Error");
        }
      });
  }
}
