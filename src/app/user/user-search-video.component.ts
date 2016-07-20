import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange, ElementRef, EventEmitter, Output, HostListener, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit, HostBinding } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { VideoCard, VideoService } from '../video.service';
import { UserService } from '../user.service';
import { EventService } from '../event.service';
import { SelectWhenFocusDirective } from '../video.directive';
import { FacebookPlayerComponent, Html5PlayerComponent, YoutubePlayerComponent } from '../facebook.component';
import { GoTop } from '../video.directive';

declare var componentHandler: any;
declare var FB:any;

@Component({
    selector: 'user-search-video',
    template: `
      <h3>Chia sẻ video của bạn cho chúng tôi</h3>      
      <hr/>
      <p>1. Copy link video <b>youtube</b> hoặc <b>facebook</b> bạn muốn chia sẻ <br/><i>https://www.youtube.com/watch?v=nugEDwNWZYw</i><br/><i>https://www.facebook.com/facebook/videos/10153231379946729/</i></p>
      <p>2. <b>Paste</b> xuống phía dưới rồi <b>nhấn enter</b> để tìm kiếm</p>
      <p>3. Sau khi video của bạn <b>được kiểm duyệt và public</b> lên web thì bạn sẽ <b>không thấy biểu tượng xóa</b> trong danh sách video của bạn</p>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%">
        <div class="" style="width: 100%">
          <input class="mdl-textfield__input" type="text" id="link" [(ngModel)]="link" (keypress)="find($event)" required select-when-focus>
          <label class="mdl-textfield__label" for="link">
            Youtube link
          </label>
        </div>
      </div>
      <br /><br />
      <div class="mdl-card mdl-cell--12-col" [hidden]="!item.link">
        <div class="mdl-card__title mdl-card--expand">                    
          <div class="mdl-textfield mdl-js-textfield mdl-card__title-text" style="width: 100%">
            <input class="mdl-textfield__input" type="text" id="title" [(ngModel)]="item.title">
            <label class="mdl-textfield__label" for="title">Title</label>
          </div>
        </div>
        <div class="videoWrapper">
          <youtube-player [link]="item.link" *ngIf="item.youtubeid"></youtube-player>
          <facebook-player [link]="item.link" *ngIf="item.facebookid"></facebook-player>
          <html5-player [link]="item.link" *ngIf="!item.youtubeid && !item.facebookid"></html5-player>
        </div>
        <div class="mdl-card__menu">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--colored" (click)="save()">
            <i class="material-icons">save</i>
          </button>
        </div>
      </div>      
    `,
    styles: ['p {font-size: 90%; margin: 8px 0px; padding: 0px; line-height: 18px; color: #737373;}'],
    directives: [SelectWhenFocusDirective, FacebookPlayerComponent, Html5PlayerComponent, YoutubePlayerComponent ]
})
export class UserSearchVideoComponent implements AfterViewInit {
  item: any = {};
  link: string;
  @Output() added: EventEmitter<any> = new EventEmitter();

  constructor(private videoService: VideoService, private userService: UserService,  private eventService: EventService){
    
  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

  getFbDuration(seconds:number){    
    seconds = Math.round(seconds);
    var min:number = Math.floor(seconds/60);
    seconds = seconds % 60;
    var hour:number;
    if(min > 0){
      hour = Math.floor(min/60);
      min = min%60;
    }
    var rs:string = "";
    if(hour) rs += hour+"H";
    if(min) rs += min+"M";
    if(seconds) rs += seconds+"S";
    console.log(rs);
    return rs;
  }

  find(event: any){
    if(event.keyCode === 13){            
      this.item = {};
      try{
        if(this.link.indexOf('youtube.com') != -1){
          //https://www.youtube.com/watch?v=YW1G2UdM47o
          let m = this.link.match(/\?v=([^&]+)/);
          if(m && m.length > 1){
            this.item.youtubeid = m[1];
            this.item.image = `http://i.ytimg.com/vi/${this.item.youtubeid}/0.jpg`; 
            this.item.link = `https://www.youtube.com/embed/${this.item.youtubeid}`;
            this.item.creator = this.userService.currentUser._id;
            var self:any = this;
            this.videoService.getYoutube(this.item.youtubeid).subscribe(
             (v: any) => { 
                self.item.title = v.title;
                self.item.rawtitle = v.title;
                self.item.duration = v.duration;
             },
             error =>  this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}));
          }          
        }else if(this.link.indexOf('facebook.com') != -1){
          //https://www.facebook.com/facebook/videos/10153231379946729/
          this.item.creator = this.userService.currentUser._id;
          this.item.link = this.link;
          let m = this.link.match(/\/videos\/([^\?\/]+)/);
          if(m && m.length > 1){
            this.item.facebookid = m[1];
            var self:any = this;
            FB.api(`/${self.item.facebookid}`, {
              fields: ['title', 'length', 'picture']
            }, function(res: any) {                     
              if (res.error) {
                this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}); 
              } else {                                
                self.item.title = res.title;
                self.item.rawtitle = res.title;
                self.item.duration = self.getFbDuration(res.length);
                self.item.image = res.picture;
              }
            });            
          }
        }else{
          console.error("not supported");
        }
      }catch(e){
        this.link = undefined;
      }
    }  
  }

  save(){
    if(!this.item || !this.item.link || !this.item.image || !this.item.title || !this.item.rawtitle || !this.item.creator || (!this.item.facebookid && !this.item.youtubeid)){
      return this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'});
    }
    this.videoService.addVideo(this.item).subscribe(
     (v: any) => { 
        if(v.length > 0){
          this.added.emit(v[0]);
          this.eventService.emit({com: 'snack-bar', msg: 'Insert done'}); 
        }else{
          this.eventService.emit({com: 'snack-bar', msg: 'Insert failed'}); 
        }
     },
     error =>  this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}));
  }
}
