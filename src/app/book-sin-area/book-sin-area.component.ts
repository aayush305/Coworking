import { Component, OnInit } from "@angular/core";
import { isUndefined } from "util";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-book-sin-area",
  templateUrl: "./book-sin-area.component.html",
  styleUrls: ["./book-sin-area.component.css"]
})
export class BookSinAreaComponent implements OnInit {
  public areaName: string;
  public price: string;
  public free: number;
  public resv: number;
  public total: number;
  public Description: string;
  public totPrice: Number;
  public reqValid: boolean;
  public reqSeat: Number;
  public imgPath: string;
  public reqMonth: Number;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Toastr: ToastrService
  ) {}

  async ngOnInit() {
    if (!sessionStorage.getItem("email")) {
      // window.scroll(0, 0);
      this.Toastr.error("Please first login", "Error", {
        progressBar: true
      });
      this.router.navigate([""]);
    }
    var data = await sessionStorage.getItem("fetchData");
    console.log("-----A->" + JSON.stringify(data));
    data = JSON.parse(data);
    console.log("-----b->" + JSON.stringify(data));
    if (!isUndefined(data)) {
      console.log("-----c->");
      this.areaName = data["name"];
      this.price = data["amount"];
      this.total = data["total"];
      this.resv = data["reserved"];
      this.Description = data["description"];
      this.free = this.total - this.resv;
      this.reqValid = true;
      this.imgPath = data["imgpath"];
      this.totPrice = 0;

      // console.log(
      //   "-----d->" + price + " " + total + " " + free + " " + Description
      // );
    }
  }

  checkSeats(reqSeat: Number) {
    this.reqSeat = reqSeat;
    if (this.reqSeat > this.free) {
      this.reqValid = false;
    } else {
      if (this.reqMonth < 24) {
        this.reqValid = true;
        if (!isUndefined(this.reqMonth))
          this.totPrice =
            Number(this.reqSeat) * Number(this.price) * Number(this.reqMonth);
      }
    }
  }

  calcutePrice(reqMonth: Number) {
    this.reqMonth = reqMonth;
    if (this.reqMonth > 24) {
      this.reqValid = false;
    } else {
      if (this.reqSeat < this.free) {
        this.reqValid = true;
        if (!isUndefined(this.reqSeat))
          this.totPrice =
            Number(this.reqSeat) * Number(this.price) * Number(this.reqMonth);
      }
    }
  }
  bookMySpace() {
    console.log("Seat----->" + this.reqSeat);
    if (this.reqValid) this.Auth.bookArea(this.reqSeat, this.reqMonth);
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    (async () => {
      // Do something before delay
      console.log("before delay");

      await delay(2000);

      // Do something after
      console.log("after delay");
      this.router.navigate(["/viewdetail"]);
    })();
  }
}
