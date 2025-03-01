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
    width: '400px',
    height: '400px',
    minWidth: '20%',
    minHeight: '20%',
    maxWidth: '80vw',
    maxHeight: '80vh',
    hasBackdrop: true,
    disableClose: false,
  };

  openDialog(tpl: TemplateRef<any>) {
    this.rndDialog.open(tpl, this.config);
  }
}
