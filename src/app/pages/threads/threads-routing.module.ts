import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { JwtAuthGuard } from '../../shared/auth/jwt-auth.guard';

const routes: Routes = [
  { path: 'threads', component: ThreadListComponent, canActivate: [JwtAuthGuard] }, // Protect list route
  { path: 'threads/new', component: ThreadEditComponent, canActivate: [JwtAuthGuard] }, // Protect new route
  { path: 'threads/:id', component: ThreadDetailComponent, canActivate: [JwtAuthGuard] }, // Protect detail route
  { path: 'threads/:id/edit', component: ThreadEditComponent, canActivate: [JwtAuthGuard] }, // Protect edit route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreadsRoutingModule {}
