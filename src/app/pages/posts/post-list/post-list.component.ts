import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Post } from '../models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() threadId: number;
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';
  sortOption: string = 'newest';

  private fetchingPostSub: Subscription;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchingPostSub = this.postService.fetchPosts(this.threadId).subscribe(
      (posts) => {
        this.posts = posts;
        this.filteredPosts = posts;
        this.sortPosts();
      },
      (error) => console.error('Error fetching posts', error)
    );
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPosts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    this.sortPosts();
  }

  onSort() {
    this.sortPosts();
  }

  sortPosts() {
    if (this.sortOption === 'newest') {
      this.filteredPosts = this.filteredPosts.sort(
        (a, b) => +new Date(b.createdDate) - +new Date(a.createdDate)
      );
    } else if (this.sortOption === 'oldest') {
      this.filteredPosts = this.filteredPosts.sort(
        (a, b) => +new Date(a.createdDate) - +new Date(b.createdDate)
      );
    } else if (this.sortOption === 'title') {
      this.filteredPosts = this.filteredPosts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
  }

  onNewPost() {
    this.router.navigate(['posts', 'new'], { relativeTo: this.route });
  }
  

  ngOnDestroy(): void {
    if (this.fetchingPostSub) {
      this.fetchingPostSub.unsubscribe();
    }
  }
}
