import { Component, Input } from '@angular/core';

import { Thread } from '../../models/thread.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
  styleUrl: './thread-item.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' })),
      ]),
    ]),
  ],  
})
export class ThreadItemComponent {
  @Input() thread: Thread;
  @Input() id: number;
}
