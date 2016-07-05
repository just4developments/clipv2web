import { Component } from '@angular/core';

@Component({
    selector: 'video-card-loading',
    template: `
    <div>
      <img src="images/loading.gif" class="inner" />
    </div>
    `,
    host: {
      '[class.mdl-card]': 'true',
      '[class.mdl-shadow--3dp]': 'true',
      '[class.mdl-cell]': 'true',
      '[class.mdl-cell--4-col]': 'true',
      '[class.mdl-cell--4-col-tablet]': 'true',
      '[class.mdl-cell--4-col-phone]': 'true'
    }
})
export class VideoCardLoadingComponent { 
}