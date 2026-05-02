import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { MasterTableComponent } from './components/master-table/master-table.component';
import { CollectionsPageComponent } from './pages/collections-page.component';
import { MetalsPageComponent } from './pages/metals-page.component';
import { StylesPageComponent } from './pages/styles-page.component';
import { ShapesPageComponent } from './pages/shapes-page.component';
import { TypesPageComponent } from './pages/types-page.component';

@NgModule({
  declarations: [
    MastersComponent,
    MasterTableComponent,
    CollectionsPageComponent,
    MetalsPageComponent,
    StylesPageComponent,
    ShapesPageComponent,
    TypesPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MastersRoutingModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class MastersModule { }
