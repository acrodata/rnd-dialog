import { RndDialog, RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RndDialogDragHandle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private dialog = inject(Dialog);
  private rndDialog = inject(RndDialog);

  config: DialogConfig<string, DialogRef> = {
    data: 'Hello, World!',
    width: '600px',
    height: '600px',
    minWidth: '300px',
    minHeight: '300px',
    maxWidth: '800px',
    maxHeight: '800px',
    hasBackdrop: true,
    disableClose: false,
  };

  openDialog(tpl: TemplateRef<any>) {
    this.rndDialog.open(tpl, this.config);
  }
}
