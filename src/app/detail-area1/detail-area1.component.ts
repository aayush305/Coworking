import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { isUndefined } from "util";

@Component({
  selector: "app-detail-area1",
  templateUrl: "./detail-area1.component.html",
  styleUrls: ["./detail-area1.component.css"]
})
export class DetailArea1Component implements OnInit {
  public price: string = "12222";
  public free: number = 34345;
  public resv: number;
  public total: number;
  public Description: string;

  constructor(private Auth: AuthService) {}

  async ngOnInit() {
    this.Auth.getAreaDetail("FlexibaleSeats");
    var data = await sessionStorage.getItem("fetchData");
    console.log("-----A->" + JSON.stringify(data));
    data = JSON.parse(data);
    console.log("-----b->" + JSON.stringify(data));
    if (!isUndefined(data)) {
      console.log("-----c->");
      this.price = data["amount"];
      this.total = data["total"];
      this.resv = data["reserved"];
      this.Description = data["description"];
      this.free = this.total - this.resv;
      // console.log(
      //   "-----d->" + price + " " + total + " " + free + " " + Description
      // );
    }
  }
}
