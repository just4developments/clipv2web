import {Component, OnInit, Input, EventEmitter, Output, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChange, Renderer} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import {EventService} from "./event.service";
import {UserService} from "./user.service";

declare var FB:any;
declare var document: any;
declare var location: any;
declare var window: any;
declare var ENV: any;
const FANPAGE:string = "https://www.facebook.com/clipvnet/";

class AbsFacebookComponent implements OnInit, OnDestroy, AfterViewInit {
  gsub:any;
  isRenderer: boolean;

  constructor(protected eventService: EventService, protected e: ElementRef, protected tag: string) {    
    
  }

  ngOnInit() {
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'facebook'){
        if(data.action === 'loaded') {             
          this.render();
        }
      }
    });    
  }

  ngAfterViewInit(){
    this.render();
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  protected render(){    
    if(this.isRenderer) return;
    try{
      FB.XFBML.parse(this.e.nativeElement);
      this.isRenderer =  true;
    }catch(e){}
  }
}
@Component({
    selector: 'facebook-player',
    template: '<div class="fb-video" [attr.data-href]="link" style="width: 100%" data-show-text="false" [attr.data-autoplay]="autoplay"></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookPlayerComponent extends AbsFacebookComponent implements OnChanges {
  @Input() link:string;
  autoplay:boolean;

  constructor(protected eventService: EventService, protected e: ElementRef) {        
    super(eventService, e, 'facebook-player');
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){     
    if(!changes['link'].isFirstChange()){
      this.autoplay = true;
    }
  }
}

@Component({
    selector: 'html5-player',
    template: `
      <video width="100%" controls>
        <source [src]="url" type="video/mp4">
      </video>
    `
})
export class Html5PlayerComponent implements OnChanges, AfterViewInit {
  @Input() link:string;
  url: SafeResourceUrl;
  video: any;

  constructor(private sanitizer: DomSanitizationService, private r:Renderer, private e: ElementRef) {    
    
  }

  ngAfterViewInit(){
    this.video = this.e.nativeElement.querySelector('video');
    this.video.volume = 0.5;
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){ 
    this.url = this.sanitizer.bypassSecurityTrustUrl(this.link);
    if(!changes['link'].isFirstChange()){      
      setTimeout(() =>{
        this.video.load();
        this.video.play();
      });      
    }
  }
}

@Component({
    selector: 'youtube-player',
    template: '<iframe width="560" height="349" [src]="url" frameborder="0" allowfullscreen></iframe>'
})
export class YoutubePlayerComponent implements OnChanges {
  @Input() link:string;
  url: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizationService, private r:Renderer, private e: ElementRef) {    
    
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){ 
    if(!changes['link'].isFirstChange()){
      this.link += '?autoplay=1';
    }
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
  }
}

@Component({
    selector: 'facebook-login',
    template: `
      <button class="mdl-button mdl-js-button mdl-button--colored" (click)="onFacebookLoginClick()" *ngIf="type === 0">
        Login
      </button>
      <nav class="mdl-navigation" *ngIf="type === 1">
        <a class="mdl-navigation__link" href="javascript:void(0);" (click)="onFacebookLoginClick()"><i class="material-icons">perm_identity</i> Login</a>
      </nav>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookLoginComponent implements OnInit, OnDestroy {
  gsub:any;
  @Input() type: number = 0;

  constructor(private userService: UserService, private eventService: EventService) {    
    
  }

  onFacebookLoginClick() {
    var self: FacebookLoginComponent = this;
    FB.login((resp: any) => {
      this.getInfor(self, resp);
    }, {scope: 'email, publish_actions, user_friends'});
  }

  ngOnInit() {
    FB.init({ 
      appId: 'development' === ENV ? '850835344955953' : '1565004733775516',
      status: true, 
      cookie: true, 
      xfbml: true,
      version: 'v2.6'
    });
    // this.gsub = this.eventService.emitter.subscribe((data: any) => {
    //   console.log(data);
    //   if(data.com === 'facebook'){
    //     if(data.action === 'loaded') {             
    //       this.loginCallback();
    //     }
    //   }
    // });
    this.loginCallback();
  }

  ngOnDestroy() {
    // this.gsub.unsubscribe();
  }

  loginCallback() {
    var self: FacebookLoginComponent = this;
    FB.getLoginStatus((resp: any) => {
      self.getInfor(self, resp);      
    });
  }

  getInfor(self: FacebookLoginComponent, resp: any){  
    if(resp.status === 'connected'){
      if(window.localStorage.user){
        return self.eventService.emit({com: 'facebook', action: 'login', data: JSON.parse(window.localStorage.user)});
      }
      FB.api('/me', {
        fields: ['email','name','age_range']
      }, function(res: any) {       
        if (!res || res.error) {
          self.eventService.emit({com: 'facebook', action: 'login'});
        } else {
          res.accessToken = resp.authResponse.accessToken;
          self.userService.loginSystem(res).subscribe(
            (user: any) =>{
              user.fbid = resp.authResponse.userID;
              self.userService.currentUser = user;
              self.userService.save();
              self.eventService.emit({com: 'facebook', action: 'login', data: user});
            },
            (error: any) => {
              self.eventService.emit({com: 'facebook', action: 'login'});
            });          
        }
      });
    }else{
      self.eventService.emit({com: 'facebook', action: 'login'});
    }
  }
}

@Component({
    selector: 'facebook-page',
    template: '<div class="fb-page" data-href="' + FANPAGE + '" data-tabs="timeline" data-height="70" data-small-header="false" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false"><blockquote cite="' + FANPAGE + '" class="fb-xfbml-parse-ignore"><a href="' + FANPAGE + '">Clipvnet.com</a></blockquote></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookPageComponent extends AbsFacebookComponent {
  constructor(protected eventService: EventService, protected e: ElementRef) {    
    super(eventService, e, 'facebook-page');
  }
}

@Component({
    selector: 'facebook-like',
    template: '<div class="fb-like" data-href="' + FANPAGE + '" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookLikeComponent extends AbsFacebookComponent {
  constructor(protected eventService: EventService, protected e: ElementRef) {    
    super(eventService, e, 'facebook-like');
  }
}

@Component({
    selector: 'facebook-share',
    template: `
      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--primary" (click)="share($event)" title="Chia sẻ facebook">
        <i class="material-icons">share</i>
      </button>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookShareComponent {
  @Input() title: string;
  @Input() caption: string;
  @Input() picture: string;
  @Input() description: string;

  share(event:any){
    let link = location.href;
    FB.ui({
      display: 'popup',
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object : {
         'og:url': link,
         'og:title': this.title,
         'og:description': this.description,
         'og:image': this.picture,
         'og:caption': this.caption
        }
      })},(res: any) => {
        if (!res || res.error_message) console.log(res);
      });
  }
}

@Component({
    selector: 'facebook-comment',
    template: '<div id="fb-comments" class="fb-comments" data-width="100%" data-numposts="5"></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookCommentComponent extends AbsFacebookComponent implements OnChanges {
  @Input() link: string;

  constructor(protected eventService: EventService, protected e: ElementRef, protected r: Renderer) {    
    super(eventService, e, 'facebook-comment');
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){ 
    this.r.setElementAttribute(this.e.nativeElement, 'data-href', this.link);
    this.render();
  }

}