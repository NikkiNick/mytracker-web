import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    MatCardModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
