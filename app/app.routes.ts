import { RouterConfig } from '@angular/router';

import { VideoDetailsPageComponent } from './video-details-page.component';
import { VideoPageComponent } from './video-page.component';

import { UserVideoPageComponent } from './user-video-page.component';

export const routes: RouterConfig = [
  { path: '', component: VideoPageComponent },
  { path: 'v/:mode', component: VideoPageComponent },
  { path: 'k/:keyword', component: VideoPageComponent },
  { path: 'search/:txtSearch', component: VideoPageComponent },
  { path: 'my-video', component: UserVideoPageComponent },
  { path: ':id', component: VideoDetailsPageComponent }  
];