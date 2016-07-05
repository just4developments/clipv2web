import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideoCardListComponent } from './video-card-list.component';
import { VideoRelationListComponent } from './video-relation-list.component';
import { FacebookPageComponent } from './facebook.component';

@Component({
    selector: 'video-page',
    template: `
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">                 
          <video-card-list [filter]="filter.all"></video-card-list>          
        </div>
        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <facebook-page></facebook-page>
          <br/>
          <br/>
          <video-relation-list [filter]="filter.most" [filter]=""></video-relation-list>
          <br/>
          <video-relation-list [filter]="filter.hot"></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoCardListComponent, VideoRelationListComponent, FacebookPageComponent]
})
export class VideoPageComponent implements OnInit, OnDestroy { 
  filter:any;
  sub: any;

  constructor(private route: ActivatedRoute){
    this.filter = {};
    this.filter.most = {
      mode: 'most',
      query: {
        page: 1,        
        rows: 5
      }
    };
    this.filter.hot = {
      mode: 'hot',
      query: {
        page: 1,        
        rows: 5
      }
    };
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {     
      var txtSearch: string = params['txtSearch'];      
      var keyword: string =  params['keyword'];      
      this.filter.all = {        
        query: {
          page: 1,
          rows: 10,
        }
      };
      if(txtSearch){
        this.filter.all.mode = 'search';
        this.filter.all.query.txtSearch = txtSearch;
      }else if(keyword){
        this.filter.all.mode = 'keyword';
        this.filter.all.query.keyword = keyword;
      }else {
        this.filter.all.mode = params['mode'] || 'newest';
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}