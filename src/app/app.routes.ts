import { Route } from '@angular/router';
import { ContentsComponent } from './contents/contents.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OnboardingStep1Component } from './onboarding/onboarding-step1/onboarding-step1.component';
import { OnboardingStep2Component } from './onboarding/onboarding-step2/onboarding-step2.component';
import { OnboardingStep3Component } from './onboarding/onboarding-step3/onboarding-step3.component';
import { OnboardingStep4Component } from './onboarding/onboarding-step4/onboarding-step4.component';
import { OnboardingStep5Component } from './onboarding/onboarding-step5/onboarding-step5.component';
import { ViewSummaryComponent } from './view-summary/view-summary.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { RecordActivityComponent } from './record-activity/record-activity.component';
import { ViewActivitiesComponent } from './view-activities/view-activities.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TabsComponent } from './tabs/tabs.component';

export const routes: Route[] = [
  {
    path: 'app',
    children: [
      {
        path: 'summary',
        component: TabsComponent,
        children: [{ path: 'view', component: ViewSummaryComponent }],
      },
      {
        path: 'activities',
        children: [
          { path: 'new', component: AddActivityComponent },
          { path: 'record', component: RecordActivityComponent },
          { path: 'view', component: ViewActivityComponent },
          { path: 'all', component: ViewActivitiesComponent },
        ],
      },
      {
        path: 'events',
        children: [
          { path: 'new', component: AddEventComponent },
          { path: 'view', component: ViewEventComponent },
          {
            path: 'schedule',
            component: TabsComponent,
            children: [{ path: '', component: ViewScheduleComponent }],
          },
        ],
      },
      {
        path: 'profile',
        children: [{ path: 'view', component: ProfileComponent }],
      },
      {
        path: 'settings',
        children: [{ path: 'view', component: SettingsComponent }],
      },
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
    ],
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'contents', component: ContentsComponent },
  { path: '', redirectTo: '/app/events/view', pathMatch: 'full' },
];
