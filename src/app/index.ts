// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState } from './app.service';
import { ResponsiveState, ResponsiveConfig, ResponsiveConfigInterface } from 'responsive-directives-angular2';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';

import { EventService } from './event.service';
import { UserService } from './user.service';
import { VideoService } from './video.service';

let config: ResponsiveConfigInterface = {
    breakPoints: {
            xs: {max: 479},
            sm: {min: 480, max: 839},
            md: {min: 0, max: 839},
            lg: {min: 840, max: 1280},
            xl: {min: 840}
    },
    debounceTime: 100 // allow to debounce checking timer
};

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  {
      provide: ResponsiveConfig,
      useFactory: () => new ResponsiveConfig(config)
  },
  ResponsiveState,
  Title, HTTP_PROVIDERS, EventService, VideoService, UserService, { provide: LocationStrategy, useClass: PathLocationStrategy }
];
