import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public constructor(private readonly alertController: AlertController) {}

  public async present(props?: AlertOptions) {
    const alert = await this.alertController.create(props);
    await alert.present();
  }
}
