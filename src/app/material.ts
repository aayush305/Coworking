import { MatDialogModule } from "@angular/material";
import { NgModule } from "@angular/core";

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule
} from "@angular/material";

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule
];
@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
