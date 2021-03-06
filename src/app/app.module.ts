import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/about.component";
import { BookspaceComponent } from "./bookspace/bookspace.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { ReqvisitComponent } from "./reqvisit/reqvisit.component";
import { SignupComponent } from "./signup/signup.component";
import { TeamComponent } from "./team/team.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { AuthService } from "./auth.service";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LogoutComponent } from "./logout/logout.component";
import { OtpComponent } from "./otp/otp.component";
import { DetailArea1Component } from "./detail-area1/detail-area1.component";
import { BookSinAreaComponent } from "./book-sin-area/book-sin-area.component";
import { ViewDetailComponent } from "./view-detail/view-detail.component";
import { EditbookingComponent } from "./editbooking/editbooking.component";
import { RouterModule, Routes } from "@angular/router";
import { EditBookAreaComponent } from "./edit-book-area/edit-book-area.component";
import { ViewVisitReqComponent } from "./view-visit-req/view-visit-req.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { ForgotmailComponent } from "./forgotmail/forgotmail.component";
import { NewpasswordComponent } from "./newpassword/newpassword.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "area1", component: DetailArea1Component },
  { path: "bookarea", component: BookSinAreaComponent },
  { path: "viewdetail", component: ViewDetailComponent },
  { path: "editdetail", component: EditbookingComponent },
  { path: "team", component: TeamComponent },
  { path: "reqvisit", component: ReqvisitComponent },
  { path: "about", component: AboutComponent },
  { path: "bookspace", component: BookspaceComponent },
  { path: "editdetail", component: EditbookingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BookspaceComponent,
    HeaderComponent,
    LoginComponent,
    ReqvisitComponent,
    SignupComponent,
    TeamComponent,
    FooterComponent,
    HomeComponent,
    LogoutComponent,
    OtpComponent,
    DetailArea1Component,
    BookSinAreaComponent,
    ViewDetailComponent,
    EditbookingComponent,
    EditBookAreaComponent,
    ViewVisitReqComponent,
    ForgotComponent,
    ForgotmailComponent,
    NewpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled"
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: false
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignupComponent, OtpComponent]
})
export class AppModule {}
