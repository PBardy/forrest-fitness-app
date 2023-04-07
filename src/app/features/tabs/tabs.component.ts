import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonMenu, IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IonicModule, FontAwesomeModule, RouterModule],
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @ViewChild('menu') public menu: IonMenu;

  public constructor(private readonly router: Router) {}

  public onClick(path: string) {
    this.menu.toggle();
    this.router.navigateByUrl(path);
  }
}
