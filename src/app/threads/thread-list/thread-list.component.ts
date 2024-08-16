import { Component } from '@angular/core';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrl: './thread-list.component.css',
})
export class ThreadListComponent {
  threads: Thread[] = [
    new Thread(
      0,
      'My First Thread',
      'Check it out!',
      new Date(),
      new Date(),
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fpic%2F&psig=AOvVaw3lbgxRFXtiuzNSubmYSCl8&ust=1723903714583000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjEpvXX-YcDFQAAAAAdAAAAABAE',
      0,
    ),
    new Thread(
      1,
      'My First Thread',
      'Check it out!',
      new Date(),
      new Date(),
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fpic%2F&psig=AOvVaw3lbgxRFXtiuzNSubmYSCl8&ust=1723903714583000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjEpvXX-YcDFQAAAAAdAAAAABAE',
      1,
    )
  ];

  onNewThread() {}
}
