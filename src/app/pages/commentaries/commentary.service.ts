import { Injectable, OnInit } from '@angular/core';
import { Commentary } from './models/commentary.model';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommentaryService implements OnInit {
  commentariesChanged = new Subject<Commentary[]>();
  private commentaries: Commentary[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  setCommentaries(commentaries: Commentary[]) {
    this.commentaries = commentaries;
    this.commentariesChanged.next(this.commentaries.slice());
  }

  fetchCommentaries(postId: number): Observable<Commentary[]> {
    return this.http
      .get<Commentary[]>(`http://localhost:8080/commentaries?postId=${postId}`)
      .pipe(
        map((commentaries) => {
          return commentaries.map((commentary) => ({
            ...commentary,
          }));
        }),
        tap((commentaries) => {
          this.setCommentaries(commentaries);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching commentaries:', error);
          return of([]);
        })
      );
  }

  postCommentary({
    content,
    postId,
    userId,
    commentaryToId,
  }: {
    content: string;
    postId: number;
    userId: number;
    commentaryToId: any;
  }): Observable<Commentary> {
    return this.http.post<Commentary>('http://localhost:8080/commentaries', {
      content: content,
      postId: postId,
      userId: userId,
      commentaryToId: commentaryToId,
    });
  }

  updateCommentary(
    id: number,
    {
      content,
      postId,
      userId,
      commentaryToId,
    }: {
      content: string;
      postId: number;
      userId: number;
      commentaryToId: any;
    }
  ): Observable<Commentary> {
    return this.http.put<Commentary>(`http://localhost:8080/commentaries/${id}`, {
        content: content,
        postId: postId,
        userId: userId,
        commentaryToId: commentaryToId
    });
  }

  deleteCommentary(id: number): Observable<Commentary> {
    return this.http.delete<Commentary>(`http://localhost:8080/commentaries/${id}`);
  }
}
