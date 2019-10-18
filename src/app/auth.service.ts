import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { Subject } from 'rxjs';



export interface userdata{
  email:string
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  public email
  public isLogged
  public authListner = new Subject<boolean>(); 
  constructor(private http:HttpClient, private router: Router, private Toastr : ToastrService,private login: MatDialog) { }

 requestvisit(name,email,mn){ 
  this.http.post("http://localhost:8000/requestvisit",{name,email,mn})
  .subscribe( (response: any) => {
    if(response.emailregister)
    {
     
      this.Toastr.error('Already Request Visited', 'Error', { progressBar: true });
     

    }
    if(response.isSucceed) {
  
      this.Toastr.success('Thanks for '+name+' request visit', 'Success', { progressBar: true });
    
     //this.router.navigate(['/login']);
    }
  }, (error: any) => {
    if(error.isSucceed === 'false'){
      this.Toastr.error('Something went wrong','Error');

      console.log('Error');
    }  });
}
/*logUserOut(status)
      {
        this.isLogged.next(status)
      }*/

      getAuthListner(){
        return this.authListner.asObservable();
      }

// islogged(): boolean{
//   return sessionStorage.getItem('email') != null
// }

loginuser(email,password){ 
  console.log("b click");

  this.http.post("http://localhost:8000/login",{email,password}).subscribe((res: any)=>{
  //  console.log("my response"+res)
    //console.log("my response"+res.isLogin)
    if(res.isLogin) {
      this.authListner.next(true);
      ///console.log(res.userd)
      console.log("email from service:"+res.userd['email'])
      sessionStorage.setItem('email',res.userd['email'])
     // this.isLogged.next(true)
      this.Toastr.success('Logging You In','Correct');
      this.login.closeAll();
      // var refresh : HeaderComponent = new HeaderComponent(null,this);
      // refresh.ngOnInit();
     
      this.router.navigate(['/head']);
    }
    if(!res.isLogin) {
      this.Toastr.error('Invalid login credentials','Error');
//          console.log('Error');
    }
}
  )}

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
