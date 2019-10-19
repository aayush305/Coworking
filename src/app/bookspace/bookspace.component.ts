import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-bookspace",
  templateUrl: "./bookspace.component.html",
  styleUrls: ["./bookspace.component.css"]
})
export class BookspaceComponent implements OnInit {
  constructor(
    private router: Router,
    private Toastr: ToastrService,
    private authCheck: AuthService
  ) {}

  ngOnInit() {}

  myRoute() {
    if (this.authCheck.getAuthStatus()) {
      this.router.navigate(["/area1"]);
    } else {
      this.Toastr.error("Please Login First!", "Error", {
        progressBar: true
      });
    }
  }
}
