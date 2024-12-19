import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  id: number;
  threadId: number;
  authorName: string = 'Deleted user';
  private fetchPostSub: Subscription;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.fetchPostSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.threadId = +params['threadId'];
      this.post = this.postService.getPost(this.id);
      if(this.post) {
        this.loadAuthorName();
      }

      if (!this.post) {
        this.postService.fetchPost(this.threadId, this.id).subscribe(
          (fetchedPost) => {
            this.post = fetchedPost[0];
            this.loadAuthorName();
          },
          (error) => {
            console.error('Failed to fetch post:', error);
          }
        );
      }
    });
  }

  isOwner(id: number) {
    if (this.authService.checkIfAdminFromToken()) return true;
    if (this.post.userId === this.authService.getUserIdFromToken()) return true;
    return false;
  }

  onUpdatePost() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  loadAuthorName() {
    this.userProfileService.fetchUser(this.post.userId).subscribe(
      (user) => {
        this.authorName = user.username;
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  onDeletePost() {
    this.postService.deletePost(this.id).subscribe();
    this.router
      .navigate([`/threads/${this.threadId}`], { relativeTo: this.route })
      .then(() => {
        window.location.reload();
      });
  }

  getTimeAgo(createdDate: string): string {
    const now = new Date();
    const created = new Date(createdDate);
    const diffMs = now.getTime() - created.getTime(); // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  ngOnDestroy(): void {
    this.fetchPostSub.unsubscribe();
  }
}
