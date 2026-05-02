import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsPageComponent } from './pages/collections-page.component';
import { MetalsPageComponent } from './pages/metals-page.component';
import { StylesPageComponent } from './pages/styles-page.component';
import { ShapesPageComponent } from './pages/shapes-page.component';
import { TypesPageComponent } from './pages/types-page.component';

const routes: Routes = [
  { path: '',            redirectTo: 'collections', pathMatch: 'full' },
  { path: 'collections', component: CollectionsPageComponent },
  { path: 'metals',      component: MetalsPageComponent },
  { path: 'styles',      component: StylesPageComponent },
  { path: 'shapes',      component: ShapesPageComponent },
  { path: 'types',       component: TypesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
