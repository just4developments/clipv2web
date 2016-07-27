import { Component, Input, OnInit, OnChanges, SimpleChange, OnDestroy, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { VideoDetails, VideoService } from '../video.service';
import { EventService } from '../event.service';
import { HowlongPipe } from '../filter.pipe';
import { UserService } from '../user.service';
import { GoTop } from '../video.directive';
import { FacebookCommentComponent, FacebookShareComponent, FacebookPlayerComponent, YoutubePlayerComponent, Html5PlayerComponent } from '../facebook.component';

declare const location: any;
declare var componentHandler: any;
declare var window: any;

@Component({
    selector: 'video-details',
    template: `
      <div class="mdl-card mdl-cell--12-col" *ngIf="item">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">{{item.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="width: initial;">          
          <div class="mdl-grid mdl-grid--no-spacing">
            <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top left">
              <span><i class="material-icons dp48">tag_faces</i>
              &nbsp;{{item.creator}}&nbsp;&nbsp;</span>
              <span *ngIf="item.nowOnTime"><i class="material-icons dp48">alarm_on</i>
              &nbsp;{{item.nowOnTime}}&nbsp;&nbsp;</span>
              <span *ngIf="item.duration"><i class="material-icons dp48">alarm</i>
              &nbsp;{{item.duration | HowlongPipe}}&nbsp;&nbsp;</span>
            </div>
            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top right" align="right">
              <button id="btnFavorite" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" [ngClass]="isFavorite ? 'mdl-button--accent' : ''" (click)="favorite($event)" title="{{isFavorite ? 'Xóa khỏi': 'Thêm vào'}} danh sách yêu thích">
                <i class="material-icons" [hidden]="isFavorite">favorite_border</i>
                <i class="material-icons" [hidden]="!isFavorite">favorite</i>
              </button>              
              <facebook-share [title]="item.title" [description]=[item.title] [picture]="item.image" [caption]="'ClipVNet.com'"></facebook-share>

              <button id="btnSpecial" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" [ngClass]="item.isSpecial ? 'mdl-button--accent' : ''" (click)="special($event)" title="{{item.isSpecial ? 'Đã thêm vào': 'Đã xóa khỏi'}} danh sách clip HOT">
                <i class="material-icons" [hidden]="item.isSpecial">star_border</i>
                <i class="material-icons" [hidden]="!item.isSpecial">star</i>
              </button>
              <button id="btnRemove" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" [ngClass]="item.status === 1 ? 'mdl-button--accent' : ''" (click)="updateStatus($event)" title="{{item.status === 1 ? 'Video đã được hiển thị': (item.status === -1 ? 'Video đã bị ẩn' : 'Video chưa được duyệt')}}">
                <i class="material-icons" [hidden]="item.status === -1">visibility</i>
                <i class="material-icons" [hidden]="item.status === 1">visibility_off</i>
              </button>
            </div>
          </div>
        </div>
        <div class="videoWrapper">        
          <youtube-player [link]="item.link" *ngIf="item.youtubeid"></youtube-player>
          <facebook-player [link]="item.link" *ngIf="item.facebookid"></facebook-player>
          <html5-player [link]="item.link" *ngIf="!item.youtubeid && !item.facebookid"></html5-player>          
        </div>
        <div class="keywords" *ngIf="!userService.isBoss()">
          <div *ngFor="let k of item.keywords" (click)="goto(k)">{{k.name}}</div>
        </div>
        <div class="keywords" *ngIf="userService.isBoss()">
          <div *ngFor="let k of keywords" class="{{hasExist(k._id) ? 'active' : ''}}" (click)="manageKeyword(k)">{{k.name}}</div>          
        </div>
        <hr style="clear: both"/>
        <facebook-comment [link]="locationHref"></facebook-comment>
      </div>
    `,
    pipes: [HowlongPipe],
    directives: [GoTop, FacebookCommentComponent, FacebookShareComponent, ROUTER_DIRECTIVES, FacebookPlayerComponent, YoutubePlayerComponent, Html5PlayerComponent]
})
export class VideoDetailsComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit { 
  @Input() item: VideoDetails;
  isFavorite:boolean;
  isSpecial:boolean;
  locationHref: string;
  gsub: any;
  isChecked: boolean= false;
  keywords: Array<any>;
  container: any;

  constructor(private title: Title, private videoService: VideoService, private eventService: EventService, private userService: UserService, private router: Router){
    
  }

  hasExist(kwid){
    return this.item.keywords.findIndex((e)=>{
      return e._id === kwid;
    }) !== -1;
  }

  goto(k:any){
    this.router.navigateByUrl('/k/'+k._id);
  }

  applyKeyword(){
    if(!this.keywords) this.keywords = this.videoService.getKeywords();    
    for(let i in this.item.keywords){
      for(let all of this.keywords){
        if(this.item.keywords[i] instanceof Object) continue;
        if(this.item.keywords[i] === all._id){
          this.item.keywords[i] = all;
        }
      } 
    }
  }

  ngOnInit(){    
    this.applyKeyword();
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'facebook'){
        if(data.action === 'login'){
          if(data.data){
            this.checkFavorite();
          }
        }     
      }
    });
  }

  ngAfterViewInit() {
    this.container = window.document.querySelector('[scroll-bottom]');
    this.container.scrollTop = 48;
    console.log('init');
  }

  manageKeyword(kw){
    this.videoService.updateVideoKeyword(this.item._id, kw._id).subscribe((kw:Array<any>) => {
      this.item.keywords = kw;
      this.applyKeyword();
    });
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  checkFavorite(){
    if(!this.userService.currentUser) return;
    this.isChecked = true;
    this.isFavorite = this.userService.currentUser.favorites.findIndex((e, idx, arr) => {
      if(e._id === this.item._id) return true;
      return false;
    }) != -1;
  }

  special(){
    this.videoService.updateSpecial(this.item._id, !this.item.isSpecial).subscribe((v:any)=>{
      this.item.isSpecial = v;
      this.eventService.emit({com: 'snack-bar', msg: v ? 'Đã thêm vào danh sách clip HOT' : 'Đã xóa khỏi danh sách clip HOT'}); 
    });
  }

  updateStatus(){
    if(this.item.status === 0) return;
    this.videoService.updateVideoStatus(this.item._id, this.item.status*-1).subscribe((v:any)=>{
      this.item.status = v;
      this.eventService.emit({com: 'snack-bar', msg: v == 1 ? 'Video đã được hiển thị': 'Video đã bị ẩn'}); 
    });
  }

  favorite(){
    if(!this.isFavorite){
      this.videoService.addFavorite(this.item).subscribe(
       (v: any) => { 
          if(v.length > 0){
            this.userService.currentUser.favorites = v;
            this.userService.save();
            this.eventService.emit({com: 'snack-bar', msg: 'Đã thêm vào danh sách yêu thích'}); 
          }else{
            this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}); 
          }
       },
       error =>  this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}));
    }else{
      this.videoService.removeFavorite(this.item._id).subscribe(
       (v: any) => {             
          this.userService.currentUser.favorites = v;
          this.userService.save();
          this.eventService.emit({com: 'snack-bar', msg: 'Đã xóa khỏi danh sách yêu thích'}); 
       },
       error =>  this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}));
    }
    this.isFavorite = !this.isFavorite;
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    this.locationHref = location.href;
    this.title.setTitle(this.item.title);    
    this.applyKeyword();
    this.checkFavorite();
    this.isChecked = false;
    if(this.container) this.container.scrollTop = 48;
    console.log('change', this.container);
  }
}