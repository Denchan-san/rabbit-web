import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Thread } from './thread.model';

@Injectable({ providedIn: 'root' })
export class ThreadService {
  threadsChanged = new Subject<Thread[]>();
  private threads: Thread[] = [
    new Thread(
      0,
      'My First Thread',
      'Check it out!',
      new Date(),
      new Date(),
      'https://t3.ftcdn.net/jpg/00/32/70/20/240_F_32702092_EpL9qwDnKyMn0AIK5dTB3PNzWti6dGRh.jpg',
      0
    ),
    new Thread(
      1,
      'My First Thread',
      'Check it out!',
      new Date(),
      new Date(),
      'https://t3.ftcdn.net/jpg/00/32/70/20/240_F_32702092_EpL9qwDnKyMn0AIK5dTB3PNzWti6dGRh.jpg',
      1
    ),
  ];

  getThreads() {
    return this.threads.slice();
  }

  getThread(id: number) {
    return this.threads[id];
  }
}
