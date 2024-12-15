import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

interface PostForm {
  title: FormControl<string>;
  description: FormControl<string>;
  image: FormControl<string>;
  threadId: FormControl<number>;
  userId: FormControl<number>;
}

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  id: number;
  threadId: number;
  editMode = false;
  postForm: FormGroup<PostForm>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.threadId = +params['threadId'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngSubmit() {
    if (this.postForm.valid) {
      console.log('EditMode');
      if (this.editMode) {
        this.postService.updatePost(this.id, this.postForm.getRawValue()).subscribe({
          next: (response) => {
            console.log('Post updated successfully', response);
          },
          error: (error) => console.error('Post update failed', error),
        });
      } else {
        console.log('NotEditMode');
        this.postService.postPost(this.postForm.getRawValue()).subscribe({
          next: (response) => {
            console.log('Post created successfully', response);
          },
          error: (error) => console.error('Post creation failed', error),
        });
      }
    }

    if(this.editMode) {
    this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
      window.location.reload();
    });
    }
    else {
      this.router.navigate(['../../'], {relativeTo: this.route}).then(() => {
        window.location.reload();
      });
    }
  }

  private initForm() {
    let postTitle = '';
    let postDescription = '';
    let postImage = '';
    let postUserId = 1; // Replace with the authenticated user's ID.

    if (this.editMode) {
      this.postService.fetchPost(this.threadId, this.id).subscribe((post) => {
        if (post) {
          postTitle = post[0].title;
          postDescription = post[0].description;
          postImage = post[0].image;
          //threadId = post[0].threadId;
          postUserId = post[0].userId;

          this.postForm.setValue({
            title: postTitle,
            description: postDescription,
            image: postImage,
            threadId: this.threadId,
            userId: postUserId,
          });
        }
      });
    }

    this.postForm = this.formBuilder.group({
      title: [postTitle, [Validators.required, Validators.maxLength(48)]],
      description: [postDescription, Validators.required],
      image: [postImage],
      threadId: [this.threadId],
      userId: [postUserId],
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
          this.postForm.controls.image.setValue(base64StringToSend);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
