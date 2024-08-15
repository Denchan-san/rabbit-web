import { NgModule } from "@angular/core";

import { ThreadsComponent } from "./threads.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadItemComponent } from "./thread-list/thread-item/thread-item.component";
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';

@NgModule({
    declarations: [
        ThreadsComponent,
        ThreadListComponent,
        ThreadItemComponent,
        ThreadDetailComponent,
        ThreadEditComponent
    ],
    imports: []
})
export class ThreadsModule {}