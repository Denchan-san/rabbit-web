import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Thread } from './thread.model';

@Injectable({ providedIn: 'root' })
export class ThreadService {
  threadsChanged = new Subject<Thread[]>();
  private threads: Thread[] = [
    new Thread(
      0,
      'Love',
      'Share All of Your Love Stories Here!',
      new Date(),
      new Date(),
      'https://images.vogue.it/users/my/avatar/milienaabuladze.png?v=1724065438',
      0
    ),
    new Thread(
      1,
      'My Second Thread',
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

  updateThread(id: number, newThread: Thread) {
    this.threads[id] = newThread;
    this.threadsChanged.next(this.threads.slice());
  }

  addThread(newThread: Thread) {
    this.threads.push(newThread);
    this.threadsChanged.next(this.threads.slice());
  }
}
