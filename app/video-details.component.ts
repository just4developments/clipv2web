import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

import { VideoDetails } from './video.service';
import { GoTop } from './video.directive';
import { FacebookCommentComponent, FacebookShareComponent } from './facebook.component';

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
          <iframe width="560" height="349" [src]="url" frameborder="0" allowfullscreen *ngIf="item.youtubeid"></iframe>
          <video width="100%" *ngIf="!item.youtubeid" controls>
            <source [src]="item.link" type="video/mp4">
          </video>
        </div>
        <div class="keywords">
          <a *ngFor="let k of item.keywords" go-top style="float: left;" class="mdl-button mdl-js-button" [routerLink]="['/k/'+k._id]">{{k.name}}</a>
        </div>
        <hr style="clear: both"/>
        <facebook-comment [link]="locationHref"></facebook-comment>
      </div>
    `,
    styles: ['.mdl-card__supporting-text, .mdl-card__supporting-text i {font-size: 12px}'],    
    directives: [GoTop, FacebookCommentComponent, FacebookShareComponent, ROUTER_DIRECTIVES]
})
export class VideoDetailsComponent implements OnChanges { 
  @Input() item: VideoDetails;    
  url: SafeResourceUrl;
  locationHref: string;

  constructor(private sanitizer: DomSanitizationService, private title: Title){
    
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    this.locationHref = location.href;
    this.title.setTitle(this.item.title);
    if(this.item.youtubeid) this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);
  }
}