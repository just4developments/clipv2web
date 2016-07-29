export * from './video-relation-list.component';
export * from './video-card-list.component';
export * from './video-page.component';

import { VideoCardListComponent, VideoPageComponent } from './';

export const routes = { path: '', component: VideoPageComponent,
  children: [
    { path: '',                    pathMatch: 'full', 				component: VideoCardListComponent },
    { path: ':mode',             	 pathMatch: 'full', 				component: VideoCardListComponent },
    { path: 'keyword/:id/:title',  pathMatch: 'full', 				component: VideoCardListComponent },
    { path: 'search/:txtSearch',   pathMatch: 'full', 				component: VideoCardListComponent }
  ] 
};