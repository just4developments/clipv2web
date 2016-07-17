import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { VideoService } from './video.service';

@Injectable()
export class VideoResolver implements Resolve<any> {
  constructor(private videoService: VideoService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.videoService.getVideo(route.params['id']);
  }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
  VideoResolver
];
