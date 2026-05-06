import { Routes } from '@angular/router';
import { Desktop } from './desktop/desktop';
import { Examples } from './examples/examples';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Desktop },
  { path: 'examples', component: Examples },
  { path: '**', redirectTo: 'home' },
];
