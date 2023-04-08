import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public constructor(private readonly toastController: ToastController) {}

  public async present(opts?: ToastOptions) {
    const toast = await this.toastController.create({
      ...opts,
      position: 'top',
      duration: 2000,
    });

    await toast.present();
  }
}
