import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-book-area",
  templateUrl: "./edit-book-area.component.html",
  styleUrls: ["./edit-book-area.component.css"]
})
export class EditBookAreaComponent implements OnInit {
  public areaName: string;
  public reqTotSeat: string;
  public reqAmount: string;
  public reqDescription: string;
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
    var temp = sessionStorage.getItem("fetchData");
    temp = JSON.parse(temp);
    console.log("my temp===" + temp["name"]);
    this.areaName = temp["name"];
  }

  getChange() {
    console.log(
      "new data===" +
        this.reqTotSeat +
        "---" +
        this.reqAmount +
        "----" +
        this.reqDescription
    );
    this.Auth.editArea(
      this.areaName,
      this.reqTotSeat,
      this.reqAmount,
      this.reqDescription
    );

    this.router.navigate([""]);
  }
}
