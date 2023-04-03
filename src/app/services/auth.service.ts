import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { filter, from, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProfile } from '@app/store/profile/profile.selectors';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly auth: AngularFireAuth
  ) {}

  public account() {
    return this.auth.authState;
  }

  public signInSilently() {
    return this.account().pipe(
      filter(Boolean),
      switchMap((_) => this.store.select(selectProfile)),
      filter(Boolean),
      tap((_) => this.router.navigate(['app']))
    );
  }

  public signInWithEmailAndPassword(payload: SignIn) {
    return from(
      this.auth.signInWithEmailAndPassword(payload.email, payload.password)
    ).pipe(
      take(1),
      switchMap((_) => this.store.select(selectProfile))
    );
  }

  public createUserWithEmailAndPassword(payload: SignUp) {
    return from(
      this.auth.createUserWithEmailAndPassword(payload.email, payload.password)
    ).pipe(
      take(1),
      switchMap((_) => this.store.select(selectProfile))
    );
  }
}

type SignIn = {
  email: string;
  password: string;
};

type SignUp = {
  email: string;
  password: string;
};
