import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'playground', component: PlaygroundComponent },
];
