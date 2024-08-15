import { NgModule } from "@angular/core";

import { ThreadsComponent } from "./threads.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadItemComponent } from "./thread-list/thread-item/thread-item.component";

@NgModule({
    declarations: [
        ThreadsComponent,
        ThreadListComponent,
        ThreadItemComponent
    ],
    imports: []
})
export class ThreadsModule {}