import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ThreadService } from '../thread.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

interface ThreadForm {
  title: FormControl<string>;
  description: FormControl<string>;
  image: FormControl<string>;
  userId: FormControl<number>;
}

@Component({
  selector: 'app-thread-edit',
  templateUrl: './thread-edit.component.html',
  styleUrls: ['./thread-edit.component.css'],
})
export class ThreadEditComponent implements OnInit {
  id: number;
  editMode = false;
  threadForm: FormGroup<ThreadForm>;

  constructor(
    private threadService: ThreadService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
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
      console.log('EditMode');
      this.threadService.updateThreads(this.id, this.threadForm.getRawValue()).subscribe({
        next: (response) => console.log('Creation successful', response),
        error: (error) => console.error('Creation failed', error),
      });
    } else {
      console.log('NotEditMode');
      this.threadService.postThread(this.threadForm.getRawValue()).subscribe({
        next: (response) => console.log('Creation successful', response),
        error: (error) => console.error('Creation failed', error),
      });
    }
    
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  private initForm() {
    let threadTitle = '';
    let threadDescription = '';
    let threadImage = ''; 

    // TODO: Replace with session or authenticated user ID
    let threadUserId = 1; 
  
    if (this.editMode) {
      this.threadService.fetchThread(this.id).subscribe((thread) => {
        if (thread) {
          threadTitle = thread.title;
          threadDescription = thread.description;
          threadImage = thread.image; 
          threadUserId = thread.userId;
  
          // Update the form values with the retrieved data
          this.threadForm.setValue({
            title: threadTitle,
            description: threadDescription,
            image: threadImage,
            userId: threadUserId,
          });
        }
      });
    }
  
    this.threadForm = this.formBuilder.group({
      title: [threadTitle, [Validators.required, Validators.maxLength(48)]],
      description: [threadDescription, Validators.required],
      image: [threadImage], 
      userId: [threadUserId],
    });
  }
  

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 256;
          canvas.height = 256;
          ctx.drawImage(img, 0, 0, 256, 256);
          const base64String = canvas.toDataURL(file.type);
          const base64StringToSend = base64String.split(',')[1];
          // Set the new image value in the form
          this.threadForm.controls.image.setValue(base64StringToSend);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
