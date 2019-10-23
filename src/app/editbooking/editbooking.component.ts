import { Component, OnInit } from "@angular/core";
import { isUndefined } from "util";
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-editbooking",
  templateUrl: "./editbooking.component.html",
  styleUrls: ["./editbooking.component.css"]
})
export class EditbookingComponent implements OnInit {
  public price: string;
  public free: number;
  public resv: number;
  public total: number;
  public totPrice: Number;
  public reqValid: boolean = true;
  public reqSeat: Number;
  public reqMonth: Number;
  public areaName: string;
  private editData: any;
  private oldSeat: any;
  private sub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private Auth: AuthService,
    private Toastr: ToastrService
  ) {
    var data = history.state.forData;
    this.oldSeat = data.oldSeat;
    console.log("data-->---->" + data.area);
    this.Auth.getAreaDetail(data.area);
  }

  ngOnInit() {
    if (!sessionStorage.getItem("email")) {
      // window.scroll(0, 0);
      this.Toastr.error("Please first login", "Error", {
        progressBar: true
      });
      this.router.navigate([""]);
    }
    this.Auth.editingCast.subscribe((dataSub: any) => {
      this.editData = dataSub;
      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
        await delay(3000);
      })();
      console.log("--->" + JSON.stringify(dataSub));

      this.free =
        Number(dataSub.fatchData.total) -
        Number(dataSub.fatchData.reserved) +
        Number(this.oldSeat);
      this.price = dataSub.fatchData.amount;
      console.log("Free--->" + this.free);
    });
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
  updateMySpace(editseat, editmonth) {
    var editid = sessionStorage.getItem("editid");
    var editemail = sessionStorage.getItem("email");
    console.log("----edit data---" + editseat + "---" + editmonth);
    this.Auth.editbooking(editemail, editid, editseat, editmonth);
  }
}
