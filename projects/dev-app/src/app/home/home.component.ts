import { Component } from '@angular/core';
import { DesktopComponent } from '../desktop/desktop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesktopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
