import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  { path: 'threads/:threadId/posts', component: PostListComponent },
  { path: 'threads/:threadId/posts/new', component: PostEditComponent },
  { path: 'threads/:threadId/posts/:id', component: PostDetailComponent },
  { path: 'threads/:threadId/posts/:id/edit', component: PostEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
