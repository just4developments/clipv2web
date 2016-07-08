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
          <video-card-list [mode]="mode" [query]="query" [page]="page" [rows]="12"></video-card-list>          
        </div>
        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <facebook-page></facebook-page>
          <br/>
          <br/>
          <video-relation-list [mode]="'most'" [page]="1" [rows]="5"></video-relation-list>
          <br/>
          <video-relation-list [mode]="'hot'" [page]="1" [rows]="5"></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoCardListComponent, VideoRelationListComponent, FacebookPageComponent]
})
export class VideoPageComponent implements OnInit, OnDestroy { 
  sub: any;
  qsub: any;
  mode: string;
  query: any = {};
  page: number = 1;

  constructor(private router: Router, private route: ActivatedRoute, private title: Title){
    
  }

  ngOnInit() {    
    this.qsub = this.router.routerState.queryParams.subscribe((params:any) => {
      this.page = +params.page || 1;      
    });
    this.sub = this.route.params.subscribe((params: any) => {
      var txtSearch: string = params['txtSearch'];      
      var keyword: string =  params['keyword'];            
      if(txtSearch){
        this.mode = 'search';
        this.query.txtSearch = txtSearch;
        this.title.setTitle(txtSearch + '***');
      }else if(keyword){
        this.mode = 'keyword';
        this.query.keyword = keyword;
        this.title.setTitle(keyword);
      }else {
        this.mode = params['mode'] || 'newest';
        if(this.mode === 'most'){
          this.title.setTitle('Xem nhiều nhất');
        }else if(this.mode === 'hot'){
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