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
import { take, tap } from 'rxjs';

interface SignInForm {
  email: FormControl<string>;
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
    email: this.formBuilder.control<string>('', [
      Validators.required,
      //Validators.email,
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

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    this.authService
      .signin(this.signInForm.getRawValue())
      .pipe(
        take(1),
        tap(() => this.router.navigate(['threads']))
      )
      .subscribe();
  }

  openSignUpPage() {
    this.router.navigate(['sign-up']);
  }
}
