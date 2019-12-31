import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeLogComponent } from './changelog/changelog.component';

const routes: Routes = [
  {path: 'changelog', component: ChangeLogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
