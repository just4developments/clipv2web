import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { MetaService } from 'ng2-meta';

import { NoContent } from './no-content';

import { VideoDetailsPageComponent } from './video';
import { VideoCardListComponent } from './videos';
import { VideoService } from './video.service';

import { UserVideoPageComponent } from './user';

import { VideoResolver } from './app.resolver';
import { routes as vroutes } from './videos';

export const routes: RouterConfig = [    
  { path: 'my-video',                pathMatch: 'full', component: UserVideoPageComponent },
  { path: 'detail/:id/:title',              pathMatch: 'full', component: 'VideoDetailsPageComponent', 
    resolve: {
      video: VideoResolver
    } 
  }, 
  { path: '', component: 'VideoPageComponent',
    canActivate: [ WebpackAsyncRoute ],
    children: [
      { path: '',                    pathMatch: 'full',         component: 'VideoCardListComponent' },
      { path: ':mode',               pathMatch: 'full',         component: 'VideoCardListComponent' },
      { path: 'keyword/:id/:title',  pathMatch: 'full',         component: 'VideoCardListComponent' },
      { path: 'search/:txtSearch',   pathMatch: 'full',         component: 'VideoCardListComponent' }
    ] 
  },
  { path: '**',                                         component: NoContent,
    data: {
      meta: {
        title: 'Page not found',
        description: 'No content'
      }
    } 
  }
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
  asyncRoutes['VideoCardListComponent']
   // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
