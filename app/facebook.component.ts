import {Component, OnInit, EventEmitter, Output, ElementRef, AfterViewInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

declare const FB:any;
declare const document: any;
declare const location: any;
const FANPAGE:string = "https://www.facebook.com/clipvnet/";

@Component({
    selector: 'facebook-login',
    template: `
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" (click)="onFacebookLoginClick()">
        Facebook
      </button>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookLoginComponent implements OnInit, AfterViewInit {
  @Output()
  login: EventEmitter<boolean> = new EventEmitter<boolean>();    

  constructor() {    
    
  }

  onFacebookLoginClick() {
    FB.login();
  }

  ngAfterViewInit() {
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.checkLogin(this);
    }, 1000);
  }

  checkLogin(self: FacebookLoginComponent){    
    try {
      FB.getLoginStatus((resp: any) => {
        if(resp.status === 'connected'){      
          FB.api('/me', {
            fields: ['email','name','age_range']
          }, function(res: any) {
            if (!res || res.error) {              
              self.login.emit(null);
            } else {
              self.login.emit(res);
            }
          });
        }else{
          self.login.emit(null);
        }      
      });
    }catch(e){
      setTimeout(() => {
        this.checkLogin(self);
      }, 200);
    }    
  }
}

@Component({
    selector: 'facebook-page',
    template: '<div class="fb-page" data-href="' + FANPAGE + '" data-tabs="timeline" data-height="70" data-small-header="false" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false"><blockquote cite="' + FANPAGE + '" class="fb-xfbml-parse-ignore"><a href="' + FANPAGE + '">Clipvnet.com</a></blockquote></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookPageComponent {
}

@Component({
    selector: 'facebook-like',
    template: '<div class="fb-like" data-href="' + FANPAGE + '" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookLikeComponent {
}

@Component({
    selector: 'facebook-share',
    template: '<div class="fb-share-button" data-href="' + location.href + '" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Chia sẻ</a></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookShareComponent {
}

@Component({
    selector: 'facebook-comment',
    template: '<div class="fb-comments" data-href="' + location.href + '" data-width="100%" data-numposts="5"></div>',
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookCommentComponent {
  link: string;
  constructor(){
    this.link = location.href;
  }
}


@Component({
    selector: 'facebook',
    template: `
      <div id="fb-root"></div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookComponent {
  appId: string = '850835344955953';
  version: string = 'v2.6';

  constructor(private e: ElementRef) {    
    var js: any = document.createElement('script'); 
    js.id = 'facebook-jssdk';
    js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=" + this.version + "&appId=" + this.appId;
    e.nativeElement.appendChild(js);
  }
}