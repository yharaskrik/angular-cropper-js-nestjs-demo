import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CropperDialogStore } from './cropper-dialog.store';

@Component({
  selector: 'cropper-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CropperDialogStore],
})
export class AppComponent {
  readonly id$ = this.cropperDialogStore.id$;

  constructor(private cropperDialogStore: CropperDialogStore) {}

  openCropper(): void {
    this.cropperDialogStore.openCropper();
  }
}
