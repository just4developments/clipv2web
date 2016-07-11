import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange, ElementRef, EventEmitter, Output, HostListener, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit, HostBinding } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { VideoCard, VideoService } from './video.service';
import { UserService } from './user.service';
import { EventService } from './event.service';
import { SelectWhenFocusDirective } from './video.directive';
import { GoTop } from './video.directive';

declare var componentHandler: any;

@Component({
    selector: 'user-search-video',
    template: `
      <h3>Upload video của bạn cho chúng tôi</h3>
      <hr/>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label" style="width: 100%">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="link">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder" style="width: 100%">
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
          <iframe width="560" height="349" [src]="url" frameborder="0" allowfullscreen *ngIf="url && item.youtubeid"></iframe>
          <video width="100%" controls *ngIf="item.link && !item.youtubeid">
            <source [src]="item.link" type="video/mp4">
          </video>
        </div>
        <div class="mdl-card__menu">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--colored" (click)="save()">
            <i class="material-icons">save</i>
          </button>
        </div>
      </div>      
    `,
    directives: [SelectWhenFocusDirective]
})
export class UserSearchVideoComponent implements AfterViewInit {
  link: string;
  url:SafeResourceUrl;
  type:string;
  item: any = {};
  @Output() added: EventEmitter<any> = new EventEmitter();

  constructor(private sanitizer: DomSanitizationService, private videoService: VideoService, private userService: UserService,  private eventService: EventService){
    
  }

  ngAfterViewInit() {
    componentHandler.upgradeDom();
  }

  find(event: any){
    if(event.keyCode === 13){      
      //https://www.youtube.com/watch?v=YW1G2UdM47o
      try{
        let m = this.link.match(/[^]*?youtube.com\/watch\?v=([^&]+)/);
        if(m && m.length > 1){
          this.item.youtubeid = m[1];
          this.item.image = `http://i.ytimg.com/vi/${this.item.youtubeid}/0.jpg`; 
          this.item.link = `https://www.youtube.com/embed/${this.item.youtubeid}`;
        }else{
          this.item.link = this.link;
        }
        this.item.creator = this.userService.currentUser._id;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);
      }catch(e){
        this.item.link = undefined;
      }
      console.log(this.item);
    }else{
      if(this.item.link && !this.link){
        this.item.link = undefined;
      }
    }    
  }

  save(){
    if(!this.item){
      return this.eventService.emit({com: 'snack-bar', msg: 'Not found'});
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
                       error =>  console.error(error));
  }
}
