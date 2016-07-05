import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { SeoService } from './seo.service';
import { VideoDetails, VideoService } from './video.service';
import { GoTop } from './video.directive';
import { FacebookCommentComponent, FacebookShareComponent } from './facebook.component';

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
              &nbsp;Chủ xị&nbsp;&nbsp;
              <i class="material-icons dp48">alarm_on</i>
              &nbsp;1 giờ trước&nbsp;&nbsp;
              <i class="material-icons dp48">alarm</i>
              &nbsp;14p40"&nbsp;&nbsp;
            </div>
            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top facebook-share" align="right">
              <facebook-share></facebook-share>
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
        <facebook-comment></facebook-comment>
      </div>
    `,
    styles: ['.mdl-card__supporting-text, .mdl-card__supporting-text i {font-size: 12px}'],
    providers: [VideoService],
    directives: [GoTop, FacebookCommentComponent, FacebookShareComponent, ROUTER_DIRECTIVES]
})
export class VideoDetailsComponent implements OnInit, OnChanges { 
  @Input() id: string;  
  keywords: Array<any>;
  item: VideoDetails;
  url: SafeResourceUrl;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizationService, private seoService: SeoService){
    this.videoService.getKeywords().subscribe(
                 keywords => { this.keywords = keywords; },
                 error =>  console.error(error));
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    this.id = changes['id'].currentValue;
    this.loadVideo();
  }

  ngOnInit(){
    this.loadVideo();
  }

  loadVideo(){
    this.videoService.getVideo(this.id).subscribe(
                 (video: VideoDetails) => {
                   this.item = video; 
                   for(let i in this.item.keywords){
                      for(let all of this.keywords){
                        if(this.item.keywords[i] === all._id){
                          this.item.keywords[i] = all;
                        }
                      } 
                   }                   
                   if(this.item.youtubeid) this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);                   
                   this.seoService.setTitle(this.item.title);
                   this.seoService.setMetaDescription(this.item.title);
                 },
                 error =>  console.error(error));
  }
}