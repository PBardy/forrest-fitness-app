import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '@services/auth.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, of, take, tap } from 'rxjs';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
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
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth
      .createUserWithEmailAndPassword(this.form.getRawValue())
      .pipe(
        tap((x) =>
          x
            ? this.router.navigate(['app'])
            : this.router.navigate(['onboarding'])
        ),
        catchError((_) => this.toast.present({ message: 'Email in use' }))
      )
      .subscribe();
  }
}
