import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() threadId: number;
  posts: Post[] = [];
  subscription: Subscription;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.postService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.posts = this.postService.getPostsWithThreadId(this.threadId);
  }

  onNewPost() {
    this.router.navigate(['new', { relativeTo: this.route }]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
