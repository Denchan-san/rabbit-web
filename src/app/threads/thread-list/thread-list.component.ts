import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrl: './thread-list.component.css',
})
export class ThreadListComponent implements OnInit, OnDestroy {
  threads: Thread[] = [];
  subscription: Subscription;

  constructor(
    private threadService: ThreadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.subscription = this.threadService.threadsChanged
    .subscribe(
      (threads: Thread[]) => {
        this.threads = threads;
      }
    );
    this.threads = this.threadService.getThreads();
    console.log("object");
  }

  onNewThread() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
