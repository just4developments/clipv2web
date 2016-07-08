import { bootstrap }    from '@angular/platform-browser-dynamic';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './app.component';
import { EventService } from './event.service';
import { UserService } from './user.service';
import { enableProdMode } from '@angular/core';

enableProdMode();

bootstrap(AppComponent, [ Title, APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, EventService, UserService, { provide: LocationStrategy, useClass: PathLocationStrategy } ]);
