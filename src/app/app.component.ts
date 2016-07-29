import { Component, AfterViewInit, NgZone, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';

import { FacebookLoginComponent } from './facebook.component';
import { UserMenuComponent } from './user';
import { MainScrollDirective, MDL, GoTop, EnterDirective, SelectWhenFocusDirective, NavLeft } from './video.directive';
import { EventService } from './event.service';
import { UserService } from './user.service';
import { VideoService } from './video.service';
import { SnackBarComponent } from './snack-bar.component';

declare var componentHandler: any;
declare var FB: any;

@Component({
    selector: 'my-app',
    template: `
      <snack-bar></snack-bar>
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header" mdl>
        <div class="android-header mdl-layout__header mdl-layout__header--waterfall">
          <div class="mdl-layout__header-row">
            <a class="android-title mdl-layout-title" [routerLink]="['/']" go-top>
              ClipVNet<small>.com</small>
            </a>
            <!-- Add spacer, to align navigation to the right in desktop -->
            <div class="android-header-spacer mdl-layout-spacer"></div>
            <div class="android-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width">
              <label class="mdl-button mdl-js-button mdl-button--icon" for="search-field" id="label-search-field">
                <i class="material-icons">search</i>
              </label>
              <div class="mdl-tooltip" for="label-search-field">
                Tìm kiếm video
              </div>
              <div class="mdl-textfield__expandable-holder">
                <input class="mdl-textfield__input" type="text" id="search-field" [(ngModel)]="txtSearch" (enter)="search()" select-when-focus>
                <div class="mdl-tooltip" for="search-field">
                  Press enter to search
                </div>
              </div>              
            </div>
            <!-- Navigation -->
            <div class="android-navigation-container">
              <nav class="android-navigation mdl-navigation">
                <a class="mdl-navigation__link mdl-typography--text-uppercase" routerLinkActive="actived" [routerLinkActiveOptions]="{exact: true}" [routerLink]="['/']" go-top>Mới nhất</a>
                <a class="mdl-navigation__link mdl-typography--text-uppercase" routerLinkActive="actived" [routerLink]="['/most']" go-top>Xem nhiều nhất</a>
                <a class="mdl-navigation__link mdl-typography--text-uppercase" routerLinkActive="actived" [routerLink]="['/hot']" go-top>Hot nhất</a>
              </nav>
            </div>
            <a class="android-mobile-title mdl-layout-title" [routerLink]="['/']">
              ClipVNet<small>.com</small>
            </a>
            <facebook-login *ngIf="!userService.currentUser" class="android-more-button" [type]="0"></facebook-login>
            <a id="inbox-button" class="android-more-button" href="javascript: void(0)" *ngIf="userService.currentUser">
              <img src="http://graph.facebook.com/{{userService.currentUser.fbid}}/picture" class="avatar" width = "50"/>
            </a>
            <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="inbox-button" *ngIf="userService.currentUser">
              <user-menu [user]="userService.currentUser"></user-menu>
            </ul>
          </div>
        </div>

        <div class="android-drawer mdl-layout__drawer" *md nav-left>
          <div *ngIf="userService.currentUser" class="user-infor">
            <img src="http://graph.facebook.com/{{userService.currentUser.fbid}}/picture" class="avatar" width="50"/>
            <h6>{{userService.currentUser.name}}</h6>
          </div>
          <nav class="mdl-navigation">
            <a class="mdl-navigation__link" routerLinkActive="actived" [routerLinkActiveOptions]="{exact: true}" [routerLink]="['/']" go-top><i class="material-icons">whatshot</i> Mới nhất</a>
            <a class="mdl-navigation__link" routerLinkActive="actived" [routerLink]="['/most']" go-top><i class="material-icons">equalizer</i> Xem nhiều nhất</a>
            <a class="mdl-navigation__link" routerLinkActive="actived" [routerLink]="['/hot']" go-top><i class="material-icons">star</i> Hot nhất</a>
            <div class="android-drawer-separator"></div>
            <a class="mdl-navigation__link" routerLinkActive="actived" [routerLink]="['/my-video']" go-top *ngIf="userService.currentUser"><i class="material-icons">sentiment_very_satisfied</i> Video của tôi</a>
            <a class="mdl-navigation__link" href="javascript:void(0);" (click)="logout()" *ngIf="userService.currentUser"><i class="material-icons">power_settings_new</i> Logout</a>
          </nav>
          <facebook-login [type]="1" style="width: inherit;" *ngIf="!userService.currentUser"></facebook-login>
        </div>

        <div class="android-content mdl-layout__content" align="center" scroll-bottom>
          <div align="left" id="mainContent">
            <router-outlet></router-outlet>
          </div>
          <footer class="android-footer mdl-mega-footer" id="footer">
            <div class="mdl-mega-footer--top-section">
              <div class="mdl-mega-footer--right-section">
                <a class="mdl-typography--font-light" href="javascript: void(0);" go-top>
                  Back to Top
                  <i class="material-icons">expand_less</i>
                </a>
              </div>
            </div>
            <div class="keywords">
              <a *ngFor="let k of videoService.keywords" style="float: left;" class="mdl-button mdl-js-button" [routerLink]="['/keyword', k._id, k.uname]" go-top>{{k.name}}</a>
            </div>
            <div class="mdl-mega-footer--middle-section" style="clear: both;">
              <p class="mdl-typography--font-light">Satellite imagery: © 2014 Astrium, DigitalGlobe</p>
              <p class="mdl-typography--font-light">Some features and devices may not be available in all areas</p>
            </div>
          </footer>
        </div>  
      </div>
    `,
    directives: [UserMenuComponent, MainScrollDirective, MDL, GoTop, NavLeft, ROUTER_DIRECTIVES, FacebookLoginComponent, SnackBarComponent, EnterDirective, SelectWhenFocusDirective, CORE_DIRECTIVES]
})
export class App implements AfterViewInit, OnInit, OnDestroy {
  txtSearch: string;
  gsub: any;

  constructor(private zone: NgZone, private videoService: VideoService, private eventService: EventService, private router: Router, private userService: UserService){
    
  }

  ngOnInit(){
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'facebook'){
        if(data.action === 'login'){
          if(data.data){
            this.zone.run(()=>{
              this.userService.currentUser = data.data;
            });
          }else{
            console.log('login failed');
          }
        }else if(data.action === 'logout'){
          this.zone.run(()=>{
            this.userService.logout();
            this.router.navigateByUrl('');
          });
        }        
      }
    });
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  ngAfterViewInit() {            
    componentHandler.upgradeDom();
  }

  search(){    
    this.router.navigateByUrl('search/' + this.txtSearch + '?t=' + new Date().getTime());
  }

  logout(){
    FB.logout((res:any) => {
      this.eventService.emit({com: 'facebook', action: 'logout'});
    });
  }
}