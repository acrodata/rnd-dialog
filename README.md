# RnD Dialog

[![npm](https://img.shields.io/npm/v/@acrodata/rnd-dialog.svg)](https://www.npmjs.com/package/@acrodata/rnd-dialog)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/rnd-dialog/blob/main/LICENSE)

![screenshot](https://repository-images.githubusercontent.com/937415128/066bb68f-6707-4a8a-a374-8ca21323cfff)

Resizable and draggable dialog based on CDK dialog.

#### Quick links

[Documentation](https://github.com/acrodata/rnd-dialog?tab=readme-ov-file#rnd-dialog) |
[Playground](https://acrodata.github.io/rnd-dialog/)

## Installation

```bash
npm install @acrodata/rnd-dialog --save
```

## Usage

If you use the Material as default lib, you don't need to import any styles.

```scss
@import '@angular/cdk/overlay-prebuilt.css';

// or

@use '@angular/cdk' as cdk;

@include cdk.overlay();
```

```ts
import { Component } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { RndDialog, RndDialogDragHandle } from '@acrodata/rnd-dialog';

@Component({
  selector: 'your-app',
  template: `
    <button (click)="openDialog()">Open dialog</button>
  `,
  imports: [],
})
export class YourAppComponent {
  private rndDialog = inject(RndDialog);

  openDialog() {
    this.rndDialog.open(ExampleDialog, {
      data: 'Hello, World!',
      width: '600px',
      height: '400px',
    });
  }
}

@Component({
  selector: 'example-dialog',
  template: `
    <div class="drag-handle" rndDialogDragHandle>
      Drag handle
      <button (click)="dialogRef.close()">close</button>
    </div>
    <p>{{ data }}</p>
  `,
  imports: [RndDialogDragHandle],
})
export class ExampleDialog {
  dialogRef = inject<DialogRef<string>>(DialogRef);
  data = inject(DIALOG_DATA);
}
```

## API

The rnd-dialog simply provides a customized container for [CDK dialog](https://material.angular.io/cdk/dialog/api), so all APIs are the same with CDK dialog.

## License

MIT
