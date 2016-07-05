import { provideRouter, RouterConfig } from '@angular/router';
import { VideoDetailsPageComponent } from './video-details-page.component';
import { VideoPageComponent } from './video-page.component';

const routes: RouterConfig = [
  { path: '', component: VideoPageComponent },
  { path: 'v/:mode', component: VideoPageComponent },
  { path: 'k/:keyword', component: VideoPageComponent },
  { path: 'search/:txtSearch', component: VideoPageComponent },
  { path: ':id', component: VideoDetailsPageComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];