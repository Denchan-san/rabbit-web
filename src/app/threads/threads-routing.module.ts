import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';
import { ThreadListComponent } from './thread-list/thread-list.component';

const routes: Routes = [
  { path: 'threads', component: ThreadListComponent },
  { path: 'threads/new', component: ThreadEditComponent },
  { path: 'threads/:id', component: ThreadDetailComponent },
  { path: 'threads/:id/edit', component: ThreadEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreadsRoutingModule {}
