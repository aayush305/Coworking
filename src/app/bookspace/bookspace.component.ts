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
  public data: any;
  public areaName: string;

  constructor(
    private router: Router,
    private Toastr: ToastrService,
    private authCheck: AuthService
  ) {}

  ngOnInit() {}

  async myRoute1() {
    this.areaName = "Flexible Seat";
    this.myRoute();
  }
  async myRoute3() {
    this.areaName = "Fixed Seat";
    this.myRoute();
  }
  async myRoute2() {
    this.areaName = "Meeting";
    this.myRoute();
  }
  async myRoute4() {
    this.areaName = "Cabins";
    this.myRoute();
  }

  async myRoute() {
    // this.authCheck.getAreaDetail("");
    // this.data = await sessionStorage.getItem("fetchData");
    if (this.authCheck.getAuthStatus()) {
      console.log("here--->yes");
      this.router.navigateByUrl("/area1", { state: { dat: this.areaName } });
      //this.router.navigate(["/area1"]);
    } else {
      this.Toastr.error("Please Login First!", "Error", {
        progressBar: true
      });
    }
  }
}
