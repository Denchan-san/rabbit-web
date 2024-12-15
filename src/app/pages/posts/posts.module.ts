import { NgModule } from '@angular/core';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-list/post-item/post-item.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsRoutingModule } from './posts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentariesModule } from '../commentaries/commentaries.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostListComponent,
    PostItemComponent,
    PostDetailComponent,
    PostEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommentariesModule,
  ],
  exports: [PostListComponent],
})
export class PostsModule {}
