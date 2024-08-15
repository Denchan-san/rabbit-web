import { Component } from '@angular/core';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrl: './thread-list.component.css',
})
export class ThreadListComponent {
  threads: Thread[];

  onNewThread() {}
}
