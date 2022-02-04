import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { MatDialog } from '@angular/material/dialog';
import { from, switchMap } from 'rxjs';

export interface CropperDialogState {
  id?: string;
}

@Injectable()
export class CropperDialogStore extends ComponentStore<CropperDialogState> {
  readonly id$ = this.select((state) => state.id);

  constructor(private _matDialog: MatDialog) {
    super({});
  }

  readonly openCropper = this.effect(
    (
      origin$ // By dynamically importing the cropper we ensure that it is not included in the bundle by default and is only loaded when it is needed
    ) =>
      // This creates a separate chunk for the cropper code we write, it will also include the cropperjs lib so its not in vendor.js chunk
      origin$.pipe(
        switchMap(() =>
          from(import('./cropper').then((m) => m.CropperComponent))
        ),
        switchMap((component) =>
          this._matDialog.open(component, { id: 'cropper' }).afterClosed()
        ),
        tapResponse((result: { id: string }) => {
          this.patchState({
            id: result.id,
          });
        }, console.error)
      )
  );
}
