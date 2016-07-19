import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { VideoDetails } from '../video.service';
import { GoTop } from '../video.directive';
import { FacebookCommentComponent, FacebookShareComponent, FacebookPlayerComponent, YoutubePlayerComponent, Html5PlayerComponent } from '../facebook.component';

declare const location: any;

@Component({
    selector: 'video-details',
    template: `
      <div class="mdl-card mdl-cell--12-col" *ngIf="item">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">{{item.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="width: initial;">          
          <div class="mdl-grid mdl-grid--no-spacing">
            <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top">
              <i class="material-icons dp48">tag_faces</i>
              &nbsp;{{item.creator}}&nbsp;&nbsp;
              <i class="material-icons dp48">alarm_on</i>
              &nbsp;{{item.nowOnTime}}&nbsp;&nbsp;
              <i class="material-icons dp48">alarm</i>
              &nbsp;14p40"&nbsp;&nbsp;
            </div>
            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top facebook-share" align="right">
              <facebook-share [title]="item.title" [description]=[item.title] [picture]="item.image" [caption]="abc"></facebook-share>
            </div>
          </div>
        </div>
        <div class="videoWrapper">        
          <youtube-player [link]="item.link" *ngIf="item.youtubeid"></youtube-player>
          <facebook-player [link]="item.link" *ngIf="item.facebookid"></facebook-player>
          <html5-player [link]="item.link" *ngIf="!item.youtubeid && !item.facebookid"></html5-player>          
        </div>
        <div class="keywords">
          <a *ngFor="let k of item.keywords" go-top style="float: left;" class="mdl-button mdl-js-button" [routerLink]="['/k/'+k._id]">{{k.name}}</a>
        </div>
        <hr style="clear: both"/>
        <facebook-comment [link]="locationHref"></facebook-comment>
      </div>
    `,
    styles: ['.mdl-card__supporting-text, .mdl-card__supporting-text i {font-size: 12px}'],    
    directives: [GoTop, FacebookCommentComponent, FacebookShareComponent, ROUTER_DIRECTIVES, FacebookPlayerComponent, YoutubePlayerComponent, Html5PlayerComponent]
})
export class VideoDetailsComponent implements OnChanges { 
  @Input() item: VideoDetails;
  locationHref: string;

  constructor(private title: Title){
    
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    this.locationHref = location.href;
    this.title.setTitle(this.item.title);
  }
}