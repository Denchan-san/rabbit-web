import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Thread } from '../models/thread.model';
import { ThreadService } from '../thread.service';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
})
export class ThreadListComponent implements OnInit, OnDestroy {
  threads: Thread[] = [];
  filteredThreads: Thread[] = [];
  searchQuery: string = ''; // For binding the search input
  private threadChangeSub: Subscription;
  private fetchingThreadSub: Subscription;

  constructor(
    private threadService: ThreadService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchingThreadSub = this.threadService.fetchThreads().subscribe(
      (threads) => {
        this.threads = threads;
        this.filteredThreads = threads; // Initialize filteredThreads
      },
      (error) => {
        console.error('Error fetching threads', error);
      }
    );

    this.threadChangeSub = this.threadService.threadsChanged.subscribe(
      (updatedThreads: Thread[]) => {
        this.threads = updatedThreads;
        this.filteredThreads = updatedThreads; // Update filtered threads
      }
    );
  }

  isAdmin() {
    console.log('admin????'+this.authService.checkIfAdminFromToken());
    return this.authService.checkIfAdminFromToken();
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredThreads = this.threads.filter((thread) =>
      thread.title.toLowerCase().includes(query)
    );
  }

  onNewThread() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.threadChangeSub) {
      this.threadChangeSub.unsubscribe();
    }
    if (this.fetchingThreadSub) {
      this.fetchingThreadSub.unsubscribe();
    }
  }
}
