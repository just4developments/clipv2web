export * from './video-relation-list.component';
export * from './video-card-list.component';
export * from './video-page.component';

import { VideoCardListComponent, VideoPageComponent } from './';

export const routes = { path: '', component: VideoPageComponent,
  children: [
    { path: '', component: VideoCardListComponent },
    { path: 'v/:mode', component: VideoCardListComponent },
    { path: 'k/:keyword', component: VideoCardListComponent },
    { path: 'search/:txtSearch', component: VideoCardListComponent }
  ] 
};