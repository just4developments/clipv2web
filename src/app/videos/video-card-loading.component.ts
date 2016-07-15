import { Component } from '@angular/core';

@Component({
    selector: 'video-card-loading',
    template: `
      <img src="/assets/img/loading.gif" class="inner" />
    `,
    host: {
      '[class.mdl-card]': 'true',
      '[class.mdl-cell]': 'true',
      '[class.mdl-cell--4-col]': 'true',
      '[class.mdl-cell--4-col-tablet]': 'true',
      '[class.mdl-cell--4-col-phone]': 'true'
    }
})
export class VideoCardLoadingComponent { 
}