import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Event, WithId } from '@types';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { map, switchMap } from 'rxjs';
import { selectEventById } from '@app/store/event/event.selectors';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    LetModule,
  ],
  templateUrl: './view-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventComponent {
  public event$ = this.route.paramMap.pipe(
    map((x) => x.get('id') as string),
    switchMap((x) => this.store.select(selectEventById(x)))
  );

  public constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public onEdit(payload: WithId<Event>) {
    this.router.navigate(['app', 'events', payload.id, 'edit']);
  }

  public onClose() {
    this.router.navigate(['app', 'events', 'schedule']);
  }
}
