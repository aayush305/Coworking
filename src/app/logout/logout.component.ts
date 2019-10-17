import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private Auth:AuthService,private Toastr:ToastrService) { }

  ngOnInit() {
    //this.Auth.logUserOut(false)
  
    //sessionStorage.removeItem('email')
    // this.Toastr.success("logged out successfully")
     //this.router.navigate([''])
  }

}
