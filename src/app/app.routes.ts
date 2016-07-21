import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { NoContent } from './no-content';

import { VideoDetailsPageComponent } from './video';
import { VideoCardListComponent } from './videos';
import { VideoService } from './video.service';

import { UserVideoPageComponent } from './user';

import { VideoResolver } from './app.resolver';

export const routes: RouterConfig = [
  { path: 'my-video', component: UserVideoPageComponent },
  { path: '', component: 'VideoPageComponent', 
    canActivate: [ WebpackAsyncRoute ],
    children: [
      { path: '', component: 'VideoCardListComponent' },
      { path: 'v/:mode', component: 'VideoCardListComponent' },
      { path: 'k/:keyword', component: 'VideoCardListComponent' },
      { path: 'search/:txtSearch', component: 'VideoCardListComponent' }
    ] 
  },    
  { path: ':id/:title', component: 'VideoDetailsPageComponent', 
    resolve: {
      video: VideoResolver
    } 
  },  
  { path: '**',    component: NoContent },
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'VideoDetailsPageComponent': require('es6-promise-loader!./video'),
  'VideoPageComponent': require('es6-promise-loader!./videos'),
  'VideoCardListComponent': require('es6-promise-loader!./videos')
  // 'Index': require('es6-promise-loader!./+detail'), // must be exported with detail/index.ts
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['VideoDetailsPageComponent'],
  asyncRoutes['VideoPageComponent'],
   // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
