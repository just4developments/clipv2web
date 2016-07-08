import { bootstrap }    from '@angular/platform-browser-dynamic';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { routes } from './app.routes';
import {HTTP_PROVIDERS} from '@angular/http';
import { provideRouter } from '@angular/router';

import {AppComponent} from './app.component';
import { EventService } from './event.service';
import { UserService } from './user.service';
import { enableProdMode } from '@angular/core';

enableProdMode();

bootstrap(AppComponent, [ Title, [provideRouter(routes)], HTTP_PROVIDERS, EventService, UserService, { provide: LocationStrategy, useClass: PathLocationStrategy } ]);
