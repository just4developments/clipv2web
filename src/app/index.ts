// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState } from './app.service';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';

import { EventService } from './event.service';
import { UserService } from './user.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  Title, HTTP_PROVIDERS, EventService, UserService, { provide: LocationStrategy, useClass: PathLocationStrategy }
];
