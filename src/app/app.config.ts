import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';
import { IConfig } from 'ngx-mask'

export const options: Partial<IConfig> = {
  thousandSeparator: ","
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(), provideToastr(), provideNgxMask()]
};
