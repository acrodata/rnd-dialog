import { RndDialog, RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { Component, inject, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RndDialogDragHandle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private rndDialog = inject(RndDialog);

  openDialog(tpl: TemplateRef<any>) {
    this.rndDialog.open(tpl, {
      data: 'Hello, World!',
    });
  }
}
