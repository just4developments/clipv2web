// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState } from './app.service';
import { ResponsiveState, ResponsiveConfig, ResponsiveConfigInterface } from 'responsive-directives-angular2';
import { provide } from '@angular/core';
import { MetaConfig, MetaService } from 'ng2-meta';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';

import { Config } from './config';
import { EventService } from './event.service';
import { UserService } from './user.service';
import { VideoService } from './video.service';
import { LocalStorage } from './localstorage.service';

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

let metaConfig = new MetaConfig({
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  defaults: {
    title: 'Kênh tổng hợp các clip vui, hài hước'
  }
});


// Application wide providers
export const APP_PROVIDERS = [
  Config,
  AppState,  
  {
      provide: ResponsiveConfig,
      useFactory: () => new ResponsiveConfig(config)
  },
  ResponsiveState,
  Title, provide('meta.config', {useValue: metaConfig}), 
  MetaService, 
  provide(LocalStorage, {useClass: LocalStorage}),
  EventService, VideoService, UserService
];
