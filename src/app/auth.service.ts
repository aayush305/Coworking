import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

export interface userdata{
  email:string
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http:HttpClient, private router: Router, private Toastr : ToastrService) { }

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

      console.log('Error,neel');
    }  });
}
}
