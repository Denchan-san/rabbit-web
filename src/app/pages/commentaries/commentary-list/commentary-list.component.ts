import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentaryService } from '../commentary.service';
import { Commentary } from '../models/commentary.model';

@Component({
  selector: 'app-commentary-list',
  templateUrl: './commentary-list.component.html',
  styleUrls: ['./commentary-list.component.css'],
})
export class CommentaryListComponent implements OnInit, OnDestroy {
  @Input() postId!: number;
  commentaries: Commentary[] = [];
  rootCommentaries: Commentary[] = [];
  newCommentaryContent = ''; // For posting new commentaries

  private fetchingCommentariesSub!: Subscription;

  constructor(private commentaryService: CommentaryService) {}

  ngOnInit() {
    this.fetchingCommentariesSub = this.commentaryService
      .fetchCommentaries(this.postId)
      .subscribe(
        (commentaries) => {
          // Sort commentaries by updatedDate (if available) or createdDate
          this.commentaries = commentaries.sort((a, b) => {
            const dateA = new Date(a.updatedDate || a.createdDate).getTime();
            const dateB = new Date(b.updatedDate || b.createdDate).getTime();
            return dateA - dateB; // Ascending order; use `dateB - dateA` for descending
          });
  
          // Extract root-level commentaries after sorting
          this.rootCommentaries = this.commentaries.filter(
            (commentary) => !commentary.commentaryToId
          );
        },
        (error) => console.error('Error fetching commentaries', error)
      );
  }
  

  ngOnDestroy() {
    if (this.fetchingCommentariesSub) {
      this.fetchingCommentariesSub.unsubscribe();
    }
  }

  // Post a new commentary
  onPostCommentary() {
    console.log(this.newCommentaryContent);
    if (!this.newCommentaryContent.trim()) return;

    this.commentaryService
      .postCommentary({
        content: this.newCommentaryContent,
        postId: this.postId,
        userId: 1, //TODO: add user
        commentaryToId: null,
      })
      .subscribe({
        next: (response) => {
          console.log('Commentary created successfully', response);
        },
        error: (error) => console.error('Commentary creation failed', error),
      });
    window.location.reload();  
  }
}
