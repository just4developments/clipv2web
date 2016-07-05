import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FacebookPageComponent } from './facebook.component';
import { VideoDetailsComponent } from './video-details.component';
import { VideoRelationListComponent } from './video-relation-list.component';


@Component({
    selector: 'video-details-page',
    template: `
      <div class="mdl-grid">
        <video-details [id] = "id" class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-details>
        <div                       class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <facebook-page></facebook-page>
          <br/>
          <video-relation-list [filter] = "filter.relation" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoDetailsComponent, VideoRelationListComponent, FacebookPageComponent]
})
export class VideoDetailsPageComponent implements OnInit, OnDestroy { 
  id: string;
  sub: any;
  filter: any;

  constructor(private route: ActivatedRoute){
    this.filter = {};
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];      
      this.filter.relation = {
        mode: 'relation',      
        query: {
          id: this.id,
          page: 1,        
          rows: 10
        }
      };
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}