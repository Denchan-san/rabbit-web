import { NgModule } from '@angular/core';
import { CommentariesComponent } from './commentaries.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsRoutingModule } from '../posts/posts-routing.module';
import { CommentaryItemComponent } from './commentary-list/commentary-item/commentary-item.component';
import { CommentaryListComponent } from './commentary-list/commentary-list.component';

@NgModule({
  declarations: [
    CommentariesComponent,
    CommentaryListComponent,
    CommentaryItemComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [CommentaryListComponent],
})
export class CommentariesModule {}
