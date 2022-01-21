import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CropperModule } from './cropper/cropper.module';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
