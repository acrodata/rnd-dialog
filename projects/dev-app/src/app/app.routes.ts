import { Routes } from '@angular/router';
import { DesktopComponent } from './desktop/desktop.component';
import { ExamplesComponent } from './examples/examples.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DesktopComponent },
  { path: 'examples', component: ExamplesComponent },
];
