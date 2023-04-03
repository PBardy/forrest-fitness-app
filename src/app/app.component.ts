import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AppComponent implements OnInit {
  public constructor(
    private readonly auth: AuthService,
    private readonly library: FaIconLibrary
  ) {
    this.library.addIconPacks(fas, fab, far);
  }

  public ngOnInit(): void {
    this.auth.signInSilently().pipe(take(1)).subscribe();
  }
}
