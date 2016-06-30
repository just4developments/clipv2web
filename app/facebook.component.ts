import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

declare const FB:any;

@Component({
    selector: 'facebook-login',
    template: `
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" (click)="onFacebookLoginClick()">
        Facebook
      </button>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class FacebookLoginComponent implements OnInit {
  @Output()
  login: EventEmitter<boolean> = new EventEmitter<boolean>();    

  constructor() {    
    FB.init({
      appId      : '850835344955953',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.6'
    });
  }

  onFacebookLoginClick() {
    FB.login();
  }

  ngOnInit() {
    var self = this;
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
  }
}