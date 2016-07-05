import {bootstrap}    from '@angular/platform-browser-dynamic';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './app.component';
import { EventService } from './event.service';

bootstrap(AppComponent, [ Title, APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, EventService, { provide: LocationStrategy, useClass: PathLocationStrategy } ]);
