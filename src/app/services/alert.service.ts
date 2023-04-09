import { Injectable } from '@angular/core';
import { AuthActions } from '@app/store/auth/auth.actions';
import { AlertController, AlertOptions } from '@ionic/angular';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public constructor(
    private readonly store: Store,
    private readonly alertController: AlertController
  ) {}

  public async present(props?: AlertOptions) {
    const alert = await this.alertController.create(props);
    await alert.present();
  }

  public async onDeleteAccountError() {
    const alert = await this.alertController.create({
      message: 'This action requires you to re-login into your account.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Log Out',
          role: 'confirm',
          handler: () => this.store.dispatch(AuthActions.signout()),
        },
      ],
    });

    await alert.present();
  }
}
