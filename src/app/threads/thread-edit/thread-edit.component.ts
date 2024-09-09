import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThreadService } from '../thread.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
      this.threadService.updateThread(this.id, this.threadForm.value);
    } else {
      this.threadService.addThread(this.threadForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let threadTitle = '';
    let threadDescription = '';
    let threadImageUrl = '';
    // let userId = authService.currentUserId;
    let threadUserId = 1;

    if (this.editMode) {
      const thread = this.threadService.getThread(this.id);
      threadTitle = thread.title;
      threadDescription = thread.description;
      threadImageUrl = thread.imageUrl;
    }

    this.threadForm = new FormGroup({
      title: new FormControl(threadTitle, Validators.required),
      description: new FormControl(threadDescription, Validators.required),
      imageUrl: new FormControl(threadImageUrl),
      userId: new FormControl(threadUserId)
    });
  }
}
