import { Injectable, OnInit } from '@angular/core';

import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';

import { Thread } from './thread.model';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: Thread[];
}


@Injectable({ providedIn: 'root' })
export class ThreadService implements OnInit {
  threadsChanged = new Subject<Thread[]>();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // private threads: Thread[] = [
  //   new Thread(
  //     0,
  //     'Love',
  //     'Share All of Your Love Stories Here!',
  //     new Date(),
  //     new Date(),
  //     'https://images.vogue.it/users/my/avatar/milienaabuladze.png?v=1724065438',
  //     0
  //   ),
  //   new Thread(
  //     1,
  //     'My Second Thread',
  //     'Check it out!',
  //     new Date(),
  //     new Date(),
  //     'https://t3.ftcdn.net/jpg/00/32/70/20/240_F_32702092_EpL9qwDnKyMn0AIK5dTB3PNzWti6dGRh.jpg',
  //     1
  //   ),
  // ];

  private threads: Thread[] = [];

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

  setThreads(threads: Thread[]) {
    this.threads = threads;
    this.threadsChanged.next(this.threads.slice());
  }

  fetchThreads(): Observable<Thread[]> {
    return this.http.get<ApiResponse>('https://localhost:7231/api/Threads').pipe(
      map(response => response.result),
      catchError(error => {
        console.error('Error fetching threads', error);
        return throwError(error);
      })
    );
  }
  
}
