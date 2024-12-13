import { Injectable, OnInit } from '@angular/core';

import { catchError, map, Observable, of, Subject, tap, throwError } from 'rxjs';

import { Thread } from './models/thread.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateThread } from './models/create-thread.model';

interface Response {
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

  private threads: Thread[] = [
    // { id: 1, title: "test1", description: "test1", image:"null",userId: 1},
    // { id: 2, title: "test2", description: "test2", image:"null",userId: 1},
    // { id: 3, title: "test3", description: "test3", image:"null",userId: 1},
    // { id: 4, title: "test4", description: "test4", image:"null",userId: 1},
  ];

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

  // fetchThreads() {
  //   return this.getThreads();
  // }

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
    console.log('THIS IS ID THAT UPDATES: ', id);
    return this.http
      .put(`http://localhost:8080/threads/${id}`, {
        title: title,
        description: description,
        image: image,
        userId: userId,
      })
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'THREAD_WITH_THIS_NAME_EXIST':
        errorMessage = 'This thread name is already taken!';
        break;
    }
    return throwError(errorMessage);
  }
}
