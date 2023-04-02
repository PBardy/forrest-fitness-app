import { Route } from '@angular/router';
import { ContentsComponent } from './contents/contents.component';

export const routes: Route[] = [
  { path: 'contents', component: ContentsComponent },
  { path: '', redirectTo: '/contents', pathMatch: 'full' },
];
