import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { customAnimation } from '@animations/custom.animation';
import { reducers, metaReducers } from '@app/store';
import { ProfileEffects } from '@app/store/profile/profile.effects';
import { ActivityEfffects } from '@app/store/activity/activity.effects';
import { EventEfffects } from '@app/store/event/event.effects';
import { NotificationEffects } from '@app/store/notifications/notification.effects';
import { WorkoutEffects } from '@app/store/workout/workout.effects';
import { AuthEffects } from '@app/store/auth/auth.effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      IonicModule.forRoot({ navAnimation: customAnimation }),
      IonicStorageModule.forRoot()
    ),
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideEffects([
      ProfileEffects,
      ActivityEfffects,
      EventEfffects,
      NotificationEffects,
      WorkoutEffects,
      AuthEffects,
    ]),
  ],
});
