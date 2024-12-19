import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commentary } from '../../models/commentary.model';
import { CommentaryService } from '../../commentary.service';
import { AuthService } from '../../../../shared/auth/auth.service';

@Component({
  selector: 'app-commentary-item',
  templateUrl: './commentary-item.component.html',
  styleUrls: ['./commentary-item.component.css'],
})
export class CommentaryItemComponent implements OnInit {
  @Input() commentary!: Commentary;
  @Input() allCommentaries: Commentary[] = [];
  @Input() depth: number = 0;

  childCommentaries: Commentary[] = [];
  replying = false;
  editing = false;
  replyContent = '';
  editContent = '';

  constructor(private commentaryService: CommentaryService, private authService: AuthService) {}

  ngOnInit() {
    this.childCommentaries = this.allCommentaries.filter(
      (reply) => reply.commentaryToId === this.commentary.id
    );
  }

  getTimestampLabel(): string {
    const postedTime = `Posted ${this.getTimeAgo(this.commentary.createdDate)}`;
    if (this.commentary.updatedDate) {
      const updatedTime = `(Updated ${this.getTimeAgo(this.commentary.updatedDate)})`;
      return `${postedTime} ${updatedTime}`;
    }
    return postedTime;
  }
  

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }

  onReply() {
    this.replying = true;
    this.replyContent = '';
  }

  submitReply() {
    const reply = {
      content: this.replyContent,
      postId: this.commentary.postId,
      userId: this.authService.getUserIdFromToken(),
      commentaryToId: this.commentary.id,
    };

    this.commentaryService.postCommentary(reply).subscribe(
      (newCommentary) => {
        this.childCommentaries.push(newCommentary);
        this.allCommentaries.push(newCommentary);
        this.cancelReply();
      },
      (error) => console.error('Error posting reply', error)
    );
    window.location.reload();
  }

  cancelReply() {
    this.replying = false;
  }

  onEdit() {
    this.editing = true;
    this.editContent = this.commentary.content;
  }

  
  isOwner(id: number) {
    if(this.authService.checkIfAdminFromToken()) return true;
    if (this.commentary.userId === this.authService.getUserIdFromToken()) return true;
    return false;
  }

  submitUpdate() {
    const updated = { ...this.commentary, content: this.editContent };
    this.commentaryService.updateCommentary(updated.id, updated).subscribe(
      () => {
        this.commentary.content = this.editContent;
        this.cancelEdit();
      },
      (error) => console.error('Error updating commentary', error)
    );
    window.location.reload();
  }

  cancelEdit() {
    this.editing = false;
  }

  // Delete commentary
  onDelete() {
    this.commentaryService.deleteCommentary(this.commentary.id).subscribe(
      () => {
        this.allCommentaries.splice(
          this.allCommentaries.indexOf(this.commentary),
          1
        );
      },
      (error) => console.error('Error deleting commentary', error)
    );
    window.location.reload();
  }
}
