import { Component, Input } from '@angular/core';

import { Thread } from '../../thread.model';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
  styleUrl: './thread-item.component.css',
})
export class ThreadItemComponent {
  @Input() thread: Thread;
  @Input() id: number;
}
