import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-reqvisit",
  templateUrl: "./reqvisit.component.html",
  styleUrls: ["./reqvisit.component.css"]
})
export class ReqvisitComponent implements OnInit {
  constructor(private Auth: AuthService) {}

  ngOnInit() {}

  
  requestvisitevent(event) {
    event.preventDefault()
    const target = event.target
    var errorList=[]

    const name = target.querySelector('#name').value
   
    const email = target.querySelector('#email').value
    
    const mn = target.querySelector('#mn').value
   
    
    if(errorList.length===0)
      this.Auth.requestvisit(name,email,mn)
}
}
  
