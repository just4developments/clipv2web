import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  qsub: any;

  constructor(private router: Router, private route: ActivatedRoute, private title: Title){
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
    this.filter.all = {        
      query: {
        page: 1,
        rows: 10,
      }
    };
    this.qsub = this.router.routerState.queryParams.subscribe((params:any) => {
      console.log(1, params.page);
      this.filter.all.query.page = params.page || 1;
      console.log(2, this.filter.all.query.page);
    });
    this.sub = this.route.params.subscribe((params: any) => {
      var txtSearch: string = params['txtSearch'];      
      var keyword: string =  params['keyword'];            
      if(txtSearch){
        this.filter.all.mode = 'search';
        this.filter.all.query.txtSearch = txtSearch;
        this.title.setTitle(txtSearch + '***');
      }else if(keyword){
        this.filter.all.mode = 'keyword';
        this.filter.all.query.keyword = keyword;
        this.title.setTitle(keyword);
      }else {
        this.filter.all.mode = params['mode'] || 'newest';
        if(this.filter.all.mode === 'most'){
          this.title.setTitle('Xem nhiều nhất');
        }else if(this.filter.all.mode === 'hot'){
          this.title.setTitle('Clip HOT nhất');
        }else {
          this.title.setTitle('ClipVNet - kênh video giải trí');
        }        
      }
    });
  }

  ngOnDestroy(){
    this.qsub.unsubscribe();
    this.sub.unsubscribe();
  }


}