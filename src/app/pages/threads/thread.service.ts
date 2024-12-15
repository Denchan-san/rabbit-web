import { Injectable, OnInit } from '@angular/core';

import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';

import { Thread } from './models/thread.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ThreadService implements OnInit {
  threadsChanged = new Subject<Thread[]>();
  private threads: Thread[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getThreads() {
    return this.threads.slice();
  }

  getThread(id: number) {
    return this.threads.find((thread) => thread.id === id);
  }

  updateThreads(
    id: number,
    {
      title,
      description,
      image,
      userId,
    }: { title: string; description: string; image: string; userId: number }
  ) {
    const response = this.updateThread(id, {
      title,
      description,
      image,
      userId,
    });
    this.threadsChanged.next(this.threads.slice());
    return response;
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
      .get<Thread[]>('http://localhost:8080/threads') // Expecting an array of Thread objects
      .pipe(
        map((threads) => {
          return threads.map((thread) => ({
            ...thread,
          }));
        }),
        tap((threads) => {
          this.setThreads(threads); // Save the threads locally
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching threads:', error);
          return of([]); // Handle error by returning an empty array
        })
      );
  }

  fetchThread(id: number): Observable<Thread> {
    return this.http.get<Thread>(`http://localhost:8080/threads/${id}`);
  }

  postThread({
    title,
    description,
    image,
    userId,
  }: {
    title: string;
    description: string;
    image: string;
    userId: number;
  }) {
    console.log({ title, description, image, userId });
    return this.http.post('http://localhost:8080/threads', {
      title: title,
      description: description,
      image: image,
      userId: userId,
    });
  }

  updateThread(
    id: number,
    {
      title,
      description,
      image,
      userId,
    }: {
      title: string;
      description: string;
      image: string;
      userId: number;
    }
  ) {
    return this.http.put(`http://localhost:8080/threads/${id}`, {
      title: title,
      description: description,
      image: image,
      userId: userId,
    });
  }
}
