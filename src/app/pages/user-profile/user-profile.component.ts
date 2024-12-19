import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from './user-profile.service';
import { AuthService } from '../../shared/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user: any;
  editMode: boolean = false;
  private fetchUserSub: Subscription;

  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field
      password: [''], // Password field (optional)
      image: [''] // Hidden input for storing base64 image
    });

    this.fetchUserSub = this.userProfileService
      .fetchUser(this.authService.getUserIdFromToken())
      .subscribe(
        (user) => {
          this.user = user;
          this.profileForm.patchValue({
            email: user.email,
          });
        },
        (error) => {
          console.error('Error fetching user', error);
        }
      );
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 256;
          canvas.height = 256;
          ctx?.drawImage(img, 0, 0, 256, 256);
          const base64String = canvas.toDataURL(file.type);
          this.profileForm.get('image')?.setValue(base64String.split(',')[1]);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const updatedUser = {
      id: this.user.id,
      username: this.user.username,
      email: this.profileForm.get('email')?.value || this.user.email, // Keep the existing email if unchanged
      password: this.profileForm.get('password')?.value.trim() || null, // Send password only if entered
      image: this.profileForm.get('image')?.value || this.user.image // Keep existing image if not updated
    };

    this.userProfileService.updateUser(updatedUser.id, updatedUser).subscribe(
      (response) => {
        console.log('Profile updated successfully!', response);
        this.user = { ...this.user, ...response }; // Update local user state
        this.editMode = false;
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.fetchUserSub) this.fetchUserSub.unsubscribe();
  }
}
