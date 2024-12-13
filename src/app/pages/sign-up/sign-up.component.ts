import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { take, tap } from 'rxjs';

interface SignUpForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  avatar: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButton],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  showPassword: boolean = false;

  signUpForm: FormGroup<SignUpForm> = this.formBuilder.group<SignUpForm>({
    username: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32),
    ]),
    email: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]),
    avatar: this.formBuilder.control<string>(''),
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
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
          console.log(base64StringToSend);
          this.signUpForm.controls.avatar.setValue(base64StringToSend);
        };
        img.src = reader.result as string; 
      };
      reader.readAsDataURL(file); 
    }
  }

  onSignUp() {
    this.authService
      .signup(this.signUpForm.getRawValue())
      .pipe(
        take(1),
        tap(() => this.router.navigate(['threads']))
      )
      .subscribe();
  }
  
  openSignInPage() {
    this.router.navigate(['sign-in']);
  }
}
