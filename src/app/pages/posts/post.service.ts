import { Injectable, OnInit } from '@angular/core';

import { catchError, map, Observable, of, Subject, tap } from 'rxjs';

import { Post } from './models/post.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService implements OnInit {
  postsChanged = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getPosts() {
    return this.posts.slice();
  }

  getPost(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  updatePost(
    id: number,
    {
      title,
      description,
      image,
      threadId,
      userId,
    }: {
      title: string;
      description: string;
      image: string;
      threadId: number;
      userId: number;
    }
  ) {
    return this.http.put(`http://localhost:8080/posts/${id}`, {
      title: title,
      description: description,
      image: image,
      threadId: threadId,
      userId: userId,
    });
  }

  postPost({
    title,
    description,
    image,
    threadId,
    userId,
  }: {
    title: string;
    description: string;
    image: string;
    threadId: number;
    userId: number;
  }) {
    console.log({ title, description, image, threadId, userId });
    return this.http.post('http://localhost:8080/posts', {
      title: title,
      description: description,
      image: image,
      threadId: threadId,
      userId: userId,
    });
  }

  fetchPost(threadId: number, id: number): Observable<Post> {
    return this.http.get<Post>(
      `http://localhost:8080/posts?id=${id}&threadId=${threadId}`
    );
  }

  fetchPosts(threadId: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`http://localhost:8080/posts?threadId=${threadId}`)
      .pipe(
        map((posts) => {
          return posts.map((post) => ({
            ...post,
          }));
        }),
        tap((posts) => {
          this.setPosts(posts);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching posts:', error);
          return of([]);
        })
      );
  }

  deletePost(id: number) {
    console.log('deleteing post with id :' + id);
    return this.http.delete(`http://localhost:8080/posts/${id}`);
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
    this.postsChanged.next(this.posts.slice());
  }

  getPostsWithThreadId(threadId: number) {
    return this.posts.slice().filter((post) => post.threadId === threadId);
  }
}
