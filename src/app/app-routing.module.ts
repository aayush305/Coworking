import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReqvisitComponent } from "./reqvisit/reqvisit.component";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [{ path: "", component: ReqvisitComponent },{path:"head", component: HeaderComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
