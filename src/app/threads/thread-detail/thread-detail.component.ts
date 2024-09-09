import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Thread } from '../thread.model';
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
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.thread = this.threadService.getThread(this.id);
      
      if (!this.thread) {
        // Optionally fetch thread data if not found in the service
        this.threadService.fetchThreads().subscribe((threads) => {
          this.thread = this.threadService.getThread(this.id);
          console.log(this.thread);
        });
      }
    });


  }
}
