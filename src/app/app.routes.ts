import { Route } from '@angular/router';
import { ContentsComponent } from './features/contents/contents.component';
import { LandingComponent } from './features//landing/landing.component';
import { SignInComponent } from './features//sign-in/sign-in.component';
import { ForgotPasswordComponent } from './features//forgot-password/forgot-password.component';
import { TermsOfServiceComponent } from './features//terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './features//privacy-policy/privacy-policy.component';
import { SignUpComponent } from './features//sign-up/sign-up.component';
import { OnboardingStep1Component } from './features//onboarding/onboarding-step1/onboarding-step1.component';
import { OnboardingStep2Component } from './features//onboarding/onboarding-step2/onboarding-step2.component';
import { OnboardingStep3Component } from './features//onboarding/onboarding-step3/onboarding-step3.component';
import { OnboardingStep4Component } from './features//onboarding/onboarding-step4/onboarding-step4.component';
import { OnboardingStep5Component } from './features//onboarding/onboarding-step5/onboarding-step5.component';
import { ViewSummaryComponent } from './features//view-summary/view-summary.component';
import { AddActivityComponent } from './features//add-activity/add-activity.component';
import { RecordActivityComponent } from './features//record-activity/record-activity.component';
import { ViewActivitiesComponent } from './features//view-activities/view-activities.component';
import { ViewActivityComponent } from './features//view-activity/view-activity.component';
import { AddEventComponent } from './features//add-event/add-event.component';
import { ViewEventComponent } from './features//view-event/view-event.component';
import { ViewScheduleComponent } from './features//view-schedule/view-schedule.component';
import { ProfileComponent } from './features//profile/profile.component';
import { SettingsComponent } from './features//settings/settings.component';
import { TabsComponent } from './features//tabs/tabs.component';
import { PlanDayComponent } from './features/plan-day/plan-day.component';
import { PlanDayStep1Component } from './features/plan-day//plan-day-step1/plan-day-step1.component';
import { PlanDayStep2Component } from './features/plan-day//plan-day-step2/plan-day-step2.component';
import { OnboardingComponent } from '@features/onboarding/onboarding.component';
import { EditProfileComponent } from '@features/profile/edit-profile/edit-profile.component';
import { EditActivityComponent } from '@features/edit-activity/edit-activity.component';
import { EditEventComponent } from '@features/edit-event/edit-event.component';
import { AddWorkoutComponent } from '@features/add-workout/add-workout.component';
import { EditWorkoutComponent } from '@features/edit-workout/edit-workout.component';

export const routes: Route[] = [
  {
    path: 'app',
    children: [
      {
        path: 'summary',
        component: TabsComponent,
        children: [
          { path: 'view', component: ViewSummaryComponent },
          { path: '', pathMatch: 'full', redirectTo: '/app/summary/view' },
        ],
      },
      {
        path: 'activities',
        children: [
          { path: 'new', component: AddActivityComponent },
          { path: 'record', component: RecordActivityComponent },
          {
            path: 'all',
            component: TabsComponent,
            children: [
              {
                path: '',
                component: ViewActivitiesComponent,
              },
            ],
          },
          {
            path: ':id',
            children: [
              { path: 'edit', component: EditActivityComponent },
              { path: '', component: ViewActivityComponent },
            ],
          },
          { path: '', pathMatch: 'full', redirectTo: '/app/activities/all' },
        ],
      },
      {
        path: 'events',
        children: [
          { path: 'new', component: AddEventComponent },
          {
            path: 'plan',
            children: [
              {
                path: 'day',
                children: [
                  { path: 'step1', component: PlanDayStep1Component },
                  { path: 'step2', component: PlanDayStep2Component },
                  { path: '', component: PlanDayComponent },
                ],
              },
            ],
          },
          {
            path: 'schedule',
            component: TabsComponent,
            children: [{ path: '', component: ViewScheduleComponent }],
          },
          {
            path: ':id',
            children: [
              { path: 'edit', component: EditEventComponent },
              { path: '', component: ViewEventComponent },
            ],
          },
          { path: '', pathMatch: 'full', redirectTo: '/app/events/schedule' },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: 'view',
            component: TabsComponent,
            children: [{ path: '', component: ProfileComponent }],
          },
          { path: 'edit', component: EditProfileComponent },
          { path: '', pathMatch: 'full', redirectTo: '/app/profile/view' },
        ],
      },
      {
        path: 'settings',
        component: TabsComponent,
        children: [
          { path: 'view', component: SettingsComponent },
          { path: '', pathMatch: 'full', redirectTo: '/app/settings/view' },
        ],
      },
      {
        path: 'workouts',
        children: [
          { path: 'new', component: AddWorkoutComponent },
          {
            path: ':id',
            children: [{ path: '', component: EditWorkoutComponent }],
          },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: '/app/summary/view' },
    ],
  },
  {
    path: 'onboarding',
    children: [
      { path: 'step1', component: OnboardingStep1Component },
      { path: 'step2', component: OnboardingStep2Component },
      { path: 'step3', component: OnboardingStep3Component },
      { path: 'step4', component: OnboardingStep4Component },
      { path: 'step5', component: OnboardingStep5Component },
      { path: '', component: OnboardingComponent },
    ],
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'contents', component: ContentsComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
];
