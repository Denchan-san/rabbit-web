import { Component, Input } from '@angular/core';

import { Post } from '../../models/post.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
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
export class PostItemComponent {
  @Input() post: Post;
  @Input() id: number;

  getTimeAgo(createdDate: string): string {
    const now = new Date();
    const created = new Date(createdDate);
    const diffMs = now.getTime() - created.getTime(); // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
}
