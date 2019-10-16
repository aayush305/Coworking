import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReqvisitComponent } from "./reqvisit/reqvisit.component";

const routes: Routes = [{ path: "", component: ReqvisitComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
