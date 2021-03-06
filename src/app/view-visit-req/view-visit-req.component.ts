import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-view-visit-req",
  templateUrl: "./view-visit-req.component.html",
  styleUrls: ["./view-visit-req.component.css"]
})
export class ViewVisitReqComponent implements OnInit {
  public viewareaname: String;
  public viewemail: String;
  public bookedseat: String;
  public bookdate: String;
  public bookduration: String;
  public viewlist;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Toastr: ToastrService
  ) {}

  ngOnInit() {
    if (!sessionStorage.getItem("email")) {
      // window.scroll(0, 0);
      this.Toastr.error("Please first login", "Error", {
        progressBar: true
      });
      this.router.navigate([""]);
    }
    this.Auth.findAllReq().subscribe(data => {
      this.viewlist = data;
      console.log("in init of view detail");
    });
  }

  onDelete(data) {
    console.log("inside delete");
    var email = sessionStorage.getItem("email");
    // this.Auth.removebooking(email, this.viewlist[data]._id);
  }
}
