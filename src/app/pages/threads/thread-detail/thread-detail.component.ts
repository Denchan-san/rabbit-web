import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrl: './thread-detail.component.css',
})
export class ThreadDetailComponent implements OnInit {
  thread: Thread;
  id: number;

  constructor(
    private threadService: ThreadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isOwner(id: number) {
    //TODO: add session and validation;
    return true;
  }

  onUpdateThread() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.thread = this.threadService.getThread(this.id);

      if (!this.thread) {
        console.log(`Thread with ID ${this.id} not found in service.`);
        this.threadService.fetchThread(this.id).subscribe(
          (fetchedThread) => {
            this.thread = fetchedThread;
          },
          (error) => {
            console.error('Failed to fetch thread:', error);
          }
        );
      }
    });
  }
}
