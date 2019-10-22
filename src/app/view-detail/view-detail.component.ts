import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { isUndefined } from "util";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-view-detail",
  templateUrl: "./view-detail.component.html",
  styleUrls: ["./view-detail.component.css"]
})
export class ViewDetailComponent implements OnInit {
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
    var email = sessionStorage.getItem("email");
    this.Auth.finddetail(email).subscribe(data => {
      this.viewlist = data;
      console.log("in init of view detail");
    });
  }

  onDelete(data) {
    console.log("inside delete");
    // var email = sessionStorage.getItem("email");
    this.Auth.removebooking(this.viewlist[data]._id);
  }

  onEdit(data) {
    console.log("inside Edit");
    var email = sessionStorage.getItem("email");
    sessionStorage.setItem("editid", this.viewlist[data]._id);
    var mydata = {
      area: this.viewlist[data].areaname,
      oldSeat: this.viewlist[data].seat
    };

    this.router.navigateByUrl("/editdetail", {
      state: {
        forData: mydata
      }
    });
  }
}
