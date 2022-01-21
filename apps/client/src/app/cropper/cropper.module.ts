import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';

@NgModule({
  declarations: [CropperComponent],
  exports: [CropperComponent],
  imports: [CommonModule],
})
export class CropperModule {}
