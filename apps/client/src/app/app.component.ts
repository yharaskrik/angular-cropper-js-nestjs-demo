import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cropper-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _matDialog: MatDialog) {}

  openCropper(): void {
    // By dynamically importing the cropper we ensure that it is not included in the bundle by default and is only loaded when it is needed
    // This creates a separate chunk for the cropper code we write, it will also include the cropperjs lib so its not in vendor.js chunk
    import('./cropper')
      .then((m) => m.CropperComponent)
      .then((component) => this._matDialog.open(component));
  }
}
