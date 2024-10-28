import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';

interface SignInForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {

  signInForm: FormGroup<SignInForm> = this.formBuilder.group<SignInForm>({
    username: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32),
    ]),
    password: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]),
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  onSignIn() {
    throw new Error('Method not implemented.');
  }

  openSignUpPage() {
    this.router.navigate(['sign-up']);
  }
}
