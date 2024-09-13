import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Post } from './models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  postsChanged = new Subject<Post[]>();
  private posts: Post[] = [
    new Post(
      0,
      'Proper Love',
      "I fell in love with a girl..she's so hot!",
      new Date(),
      new Date(),
      0,
      1
    ),
    new Post(
      0,
      'Pure Love',
      'Is love is real? I really havent got any love for those fucking hoes',
      new Date(),
      new Date(),
      0,
      1
    ),
  ];

  getPostsWithThreadId(threadId: number) {
    return this.posts.slice().filter(post => post.threadId === threadId);
  }

  getPost(id: number) {
    return this.posts[id];
  }
}
