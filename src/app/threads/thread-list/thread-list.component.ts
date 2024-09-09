import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'], // Fix styleUrls here
})
export class ThreadListComponent implements OnInit, OnDestroy {
  threads: Thread[] = [];
  private threadChangeSub: Subscription; // Mark it as private
  private fetchingThreadSub: Subscription; // Mark it as private

  constructor(
    private threadService: ThreadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to the fetchThreads() observable to load threads initially
    this.fetchingThreadSub = this.threadService.fetchThreads().subscribe(
      (threads) => {
        this.threads = threads;
      },
      (error) => {
        console.error('Error fetching threads', error);
      }
    );

    // Subscribe to threadsChanged to listen for future updates
    this.threadChangeSub = this.threadService.threadsChanged.subscribe(
      (updatedThreads: Thread[]) => {
        this.threads = updatedThreads;
      }
    );
  }

  onNewThread() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    // Ensure both subscriptions are properly unsubscribed to prevent memory leaks
    if (this.threadChangeSub) {
      this.threadChangeSub.unsubscribe();
    }
    if (this.fetchingThreadSub) {
      this.fetchingThreadSub.unsubscribe();
    }
  }
}
