import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, of, take, tap } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  public readonly form = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control<string>('', [
      Validators.email,
      Validators.required,
    ]),
    password: this.fb.nonNullable.control<string>('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // valid form
    this.auth
      .signInWithEmailAndPassword(this.form.getRawValue())
      .pipe(
        tap((x) =>
          x
            ? this.router.navigate(['app'])
            : this.router.navigate(['onboarding'])
        ),
        catchError((x) => of(alert('An error occurred')))
      )
      .subscribe();
  }
}
