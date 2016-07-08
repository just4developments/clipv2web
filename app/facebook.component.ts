import {Component, OnInit, Input, EventEmitter, Output, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {EventService} from "./event.service";

declare var FB:any;
declare var document: any;
declare var location: any;
const FANPAGE:string = "https://www.facebook.com/clipvnet/";

class AbsFacebookComponent implements OnInit, OnDestroy {
  gsub:any;

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
    this.render();
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  render(){
    try{      
      var fc: any = this.e.nativeElement.querySelector(this.tag);
      FB.XFBML.parse(fc);
    }catch(e){}
  }
}

@Component({
    selector: 'facebook-login',
    template: `
      <button class="mdl-button mdl-js-button mdl-button--colored" (click)="onFacebookLoginClick()">
        Login
      </button>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookLoginComponent implements OnInit, OnDestroy {
  gsub:any;

  constructor(private eventService: EventService) {    
    
  }

  onFacebookLoginClick() {
    var self: FacebookLoginComponent = this;
    FB.login((resp: any) => {
      this.getInfor(self, resp);
    }, {scope: 'email, publish_actions, user_friends'});
  }

  ngOnInit() {
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

  loginCallback(){    
    var self: FacebookLoginComponent = this;
    FB.getLoginStatus((resp: any) => {
      self.getInfor(self, resp);      
    });
  }

  getInfor(self: FacebookLoginComponent, resp: any){
    if(resp.status === 'connected'){      
      FB.api('/me', {
        fields: ['email','name','age_range']
      }, function(res: any) {
        if (!res || res.error) {
          self.eventService.emit({com: 'facebook', action: 'login'});
        } else {
          self.eventService.emit({com: 'facebook', action: 'login', data: res});
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
    template: '<div class="fb-like" data-href="' + FANPAGE + '" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>',
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
      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--primary" (click)="share($event)">
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
      method: 'share',
      mobile_iframe: true,
      href: link,
      title: this.title,
      picture: this.picture,
      caption: this.caption,
      description: this.description
    },
    (res: any) => {
      if (res && !res.error_message) {
        alert('Posting completed.');
      } else {
        alert('Error while posting.' + link);
      }
    });
  }
}

@Component({
    selector: 'facebook-comment',
    template: '<div id="fb-comments" class="fb-comments" data-width="100%" data-numposts="5"></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookCommentComponent extends AbsFacebookComponent {
  link: string;

  constructor(protected eventService: EventService, protected e: ElementRef) {    
    super(eventService, e, 'facebook-comment');
  }

  ngOnInit(){
    super.ngOnInit();
    this.e.nativeElement.setAttribute('data-href', location.href);
  }

}