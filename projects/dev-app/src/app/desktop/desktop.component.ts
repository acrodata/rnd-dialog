import { Component, inject, OnInit } from '@angular/core';
import { RndDialog } from '@acrodata/rnd-dialog';
import { PlaygroundComponent } from '../playground/playground.component';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
})
export class DesktopComponent implements OnInit {
  private rndDialog = inject(RndDialog);

  apps = [
    { name: '1', color: '#ff605c' },
    { name: '2', color: '#ffbd44' },
    { name: '3', color: '#00ca4e' },
    { name: '4', color: '#0043ff' },
    { name: '5', color: '#8a03c4' },
  ];

  ngOnInit(): void {}

  openDialog() {
    this.rndDialog.open(PlaygroundComponent, {
      hasBackdrop: false,
    });
  }
}
