import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ThreadsComponent } from "./threads.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadItemComponent } from "./thread-list/thread-item/thread-item.component";
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';
import { ThreadsRoutingModule } from "./threads-routing.module";
import { PostsModule } from "../posts/posts.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ThreadsComponent,
        ThreadListComponent,
        ThreadItemComponent,
        ThreadDetailComponent,
        ThreadEditComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ThreadsRoutingModule,
        PostsModule,
        ReactiveFormsModule
    ],

})
export class ThreadsModule {}