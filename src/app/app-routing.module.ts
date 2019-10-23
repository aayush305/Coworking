import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReqvisitComponent } from "./reqvisit/reqvisit.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { DetailArea1Component } from "./detail-area1/detail-area1.component";
import { BookSinAreaComponent } from "./book-sin-area/book-sin-area.component";
import { ViewDetailComponent } from "./view-detail/view-detail.component";
import {ForgotComponent} from "./forgot/forgot.component"
import { ForgotmailComponent} from "./forgotmail/forgotmail.component";
import { NewpasswordComponent} from "./newpassword/newpassword.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "area1", component: DetailArea1Component },
  { path: "bookarea", component: BookSinAreaComponent },
  { path: "viewdetail", component: ViewDetailComponent },
  { path: "forgotmail", component: ForgotmailComponent },
  {path:"forgot",component:ForgotComponent},
  {path:"newpassword",component:NewpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
