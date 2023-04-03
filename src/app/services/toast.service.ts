import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public constructor(private readonly toastController: ToastController) {}

  public present(opts?: ToastOptions) {
    return from(this.toastController.create({ ...opts, duration: 2000 })).pipe(
      switchMap((t) => of(t.present()))
    );
  }
}
