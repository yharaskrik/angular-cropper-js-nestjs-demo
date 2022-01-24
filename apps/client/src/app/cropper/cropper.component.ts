import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import Cropper from 'cropperjs';
import { CropperStore } from './cropper.store';

@Component({
  selector: 'cropper-test-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
  providers: [CropperStore],
})
export class CropperComponent implements AfterViewInit {
  @ViewChild('cropper') cropperEl!: ElementRef;

  @Input() set image(image: string) {
    this._image = image;

    this.setImage(image);
  }

  readonly percentageSent$ = this.cropperStore.percentageSent$;

  readonly loading$ = this.cropperStore.loading$;

  private cropper?: Cropper;

  private _image =
    'https://d3v39pnya2398h.cloudfront.net/eyJidWNrZXQiOiJ0cmVsbGlzLWRldi1pbWFnZXMiLCJrZXkiOiJieFNZTGhjdlJQLXBob3RvLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTAwLCJoZWlnaHQiOm51bGwsImZpdCI6ImNvbnRhaW4ifX19';

  constructor(private cropperStore: CropperStore) {}

  ngAfterViewInit(): void {
    this.cropper = new Cropper(this.cropperEl.nativeElement, {
      aspectRatio: 16 / 9,
      checkCrossOrigin: false,
      dragMode: 'move',
    });

    if (this._image) this.setImage(this._image);
  }

  setImage(image: string): void {
    this.cropper?.replace(image);
  }

  cropImage(): void {
    if (this.cropper) {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) this.cropperStore.uploadImage(blob);
      });
    }
  }
}
