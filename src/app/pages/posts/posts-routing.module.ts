import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { JwtAuthGuard } from '../../shared/auth/jwt-auth.guard';

const routes: Routes = [
  { path: 'threads/:threadId/posts', component: PostListComponent, canActivate: [JwtAuthGuard] }, // Protect post list route
  { path: 'threads/:threadId/posts/new', component: PostEditComponent, canActivate: [JwtAuthGuard] }, // Protect new post route
  { path: 'threads/:threadId/posts/:id', component: PostDetailComponent, canActivate: [JwtAuthGuard] }, // Protect post detail route
  { path: 'threads/:threadId/posts/:id/edit', component: PostEditComponent, canActivate: [JwtAuthGuard] }, // Protect edit post route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
