import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { concatMap, Observable, tap } from 'rxjs';

export interface CropperState {
  loading: boolean;
  total: number;
  loaded: number;
}

@Injectable()
export class CropperStore extends ComponentStore<CropperState> {
  private readonly apiBase = `http://localhost:3333/`;

  readonly percentageSent$ = this.select(
    (state) => (state.total > 0 ? state.loaded / state.total : 0) * 100
  );

  readonly loading$ = this.select((state) => state.loading);

  constructor(private _httpClient: HttpClient) {
    super({ loading: false, loaded: 0, total: 0 });
  }

  readonly uploadImage = this.effect((blob$: Observable<Blob>) =>
    blob$.pipe(
      tap(() => this.patchState({ loading: true })),
      concatMap((blob) => {
        const formData = new FormData();

        formData.append('file', blob, 'image.svg');

        return this._httpClient
          .post(`${this.apiBase}file`, formData, {
            reportProgress: true,
            observe: 'events',
          })
          .pipe(
            tap((e) => {
              if (e.type === HttpEventType.UploadProgress) {
                console.log(e);
                this.patchState({
                  total: e.total,
                  loaded: e.loaded,
                });
              } else if (e.type === HttpEventType.Sent) {
                this.patchState({ loading: false });
              }
            })
          );
      })
    )
  );
}
