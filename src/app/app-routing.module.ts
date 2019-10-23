import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReqvisitComponent } from "./reqvisit/reqvisit.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { DetailArea1Component } from "./detail-area1/detail-area1.component";
import { BookSinAreaComponent } from "./book-sin-area/book-sin-area.component";
import { ViewDetailComponent } from "./view-detail/view-detail.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { ForgotmailComponent } from "./forgotmail/forgotmail.component";
import { NewpasswordComponent } from "./newpassword/newpassword.component";
import { EditbookingComponent } from "./editbooking/editbooking.component";
import { TeamComponent } from "./team/team.component";
import { AboutComponent } from "./about/about.component";
import { BookspaceComponent } from "./bookspace/bookspace.component";
import { EditBookAreaComponent } from "./edit-book-area/edit-book-area.component";
import { ViewVisitReqComponent } from "./view-visit-req/view-visit-req.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "area1", component: DetailArea1Component },
  { path: "bookarea", component: BookSinAreaComponent },
  { path: "viewdetail", component: ViewDetailComponent },
  { path: "editdetail", component: EditbookingComponent },
  { path: "editBookArea", component: EditBookAreaComponent },
  { path: "viewreqvisit", component: ViewVisitReqComponent },
  // { path: "about", component: AboutComponent },
  // { path: "bookspace", component: BookspaceComponent },
  { path: "editdetail", component: EditbookingComponent },
  { path: "forgotmail", component: ForgotmailComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "newpassword", component: NewpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
