import { Injectable, OnInit } from '@angular/core';

import { catchError, map, of, Subject, tap } from 'rxjs';

import { Thread } from './models/thread.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  private threads: Thread[] = [];

  getThreads() {
    return this.threads.slice();
  }

  getThread(id: number) {
    return this.threads.find((thread) => thread.id === id);
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

  fetchThreads() {
    return this.http
      .get<ApiResponse>('https://localhost:7231/api/Threads')
      .pipe(
        map((response) => {
          const threads = response.result || [];
          return threads.map((thread) => {
            return { ...thread };
          });
        }),
        tap((thread) => {
          this.setThreads(thread);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching threads:', error);
          return of([]); // Return an empty array or handle the error accordingly
        })
      );
  }

  fetchThread(id: number) {
    return this.http
      .get<ApiResponse>(`https://localhost:7231/api/Threads/${id}`)
      .pipe(
        map((response) => {
          return response.result;
        }),
        tap((thread) => {
          if (thread) {
            this.setThreads(thread);
          }
        })
      );
  }

  postThread(thread: Thread) {

  }
}
