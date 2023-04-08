import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { selectActivitiesById } from '@app/store/activity/activity.selectors';
import { LetModule } from '@ngrx/component';
import { Activity, WithId } from '@types';
import { DurationPipe } from '@pipes/duration.pipe';

@Component({
  selector: 'app-view-activity',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule,
    LetModule,
    DurationPipe,
  ],
  templateUrl: './view-activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewActivityComponent {
  public activity$ = this.route.paramMap.pipe(
    map((x) => x.get('id') as string),
    switchMap((x) => this.store.select(selectActivitiesById(x)))
  );

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  public onEdit(payload: WithId<Activity>) {
    this.router.navigate(['app', 'activities', payload.id, 'edit']);
  }

  public onClose() {
    this.router.navigate(['app', 'activities']);
  }
}
