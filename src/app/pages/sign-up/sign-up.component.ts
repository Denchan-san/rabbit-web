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

interface SignUpForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  avatarUrl: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButton],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
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
    avatarUrl: this.formBuilder.control<string>('', [Validators.required]),
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  onSignUp() {
    throw new Error('Method not implemented.');
  }
  
  openSignInPage() {
    this.router.navigate(['sign-in']);
  }
}
