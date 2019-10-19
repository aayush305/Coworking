import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReqvisitComponent } from "./reqvisit/reqvisit.component";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { DetailArea1Component } from "./detail-area1/detail-area1.component";
import { BookSinAreaComponent } from "./book-sin-area/book-sin-area.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "area1", component: DetailArea1Component },
  { path: "bookarea", component: BookSinAreaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
