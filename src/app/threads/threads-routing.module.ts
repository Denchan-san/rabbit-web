import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThreadsComponent } from './threads.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ThreadsComponent,
    children: [
        { path: ':id', component: ThreadDetailComponent },
        { path: ':id/edit', component: ThreadEditComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreadsRoutingModule {}
