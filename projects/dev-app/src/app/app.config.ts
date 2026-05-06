import { OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: OVERLAY_DEFAULT_CONFIG,
      useValue: {
        usePopover: false,
      },
    },
  ],
};
