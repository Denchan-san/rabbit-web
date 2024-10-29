import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThreadService } from '../thread.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-thread-edit',
  templateUrl: './thread-edit.component.html',
  styleUrl: './thread-edit.component.css',
})
export class ThreadEditComponent implements OnInit {
  id: number;
  editMode = false;
  threadForm: FormGroup;

  constructor(
    private threadService: ThreadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngSubmit() {
    if (this.editMode) {
      //update
      this.threadService.updateThread(this.id, this.threadForm.value);
    } else {
      //this.threadService.postThread(map((this.threadForm.value))
      //this.threadService.addThread(this.threadForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let threadTitle = '';
    let threadDescription = '';
    let threadImage = '';
    // let userId = authService.currentUserId;
    let threadUserId = 1;

    if (this.editMode) {
      const thread = this.threadService.getThread(this.id);
      threadTitle = thread.title;
      threadDescription = thread.description;
      threadImage = thread.image;
    }

    this.threadForm = new FormGroup({
      title: new FormControl(threadTitle, Validators.required),
      description: new FormControl(threadDescription, Validators.required),
      image: new FormControl(threadImage),
      userId: new FormControl(threadUserId)
    });
  }
}
