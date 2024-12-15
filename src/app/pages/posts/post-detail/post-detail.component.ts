import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  post: Post;
  id: number;
  threadId: number;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.threadId = +params['threadId'];
      this.post = this.postService.getPost(this.id);

      if(!this.post) {
        console.log(`post with id ${this.id} not found in service.`);
        this.postService.fetchPost(this.threadId, this.id).subscribe(
          (fetchedPost) => {
            this.post = fetchedPost[0]; //wtf why its array?
            console.log(this.post);
          },
          (error) => {
            console.error('Failed to fetch post:', error);
          }
        );
      }
    });
  }

  isOwner(id: number) {
    return true;
    }

  onUpdatePost() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeletePost() {
    this.postService.deletePost(this.id).subscribe();
    this.router.navigate([`/threads/${this.threadId}`], { relativeTo: this.route}).then(() => {
      window.location.reload();
    });;
  }

  getTimeAgo(createdDate: string): string {
    const now = new Date();
    const created = new Date(createdDate);
    const diffMs = now.getTime() - created.getTime(); // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
}
