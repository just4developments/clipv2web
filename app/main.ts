import {bootstrap}    from '@angular/platform-browser-dynamic';

import { Title } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { EventService } from './event.service';
import { SeoService } from './seo.service';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {HTTP_PROVIDERS} from '@angular/http';

bootstrap(AppComponent, [ Title, SeoService, APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, EventService ]);
