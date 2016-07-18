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
                <a class="mdl-navigation__link mdl-typography--text-uppercase {{actived('/')}}" [routerLink]="['/']" go-top>Mới nhất</a>
                <a class="mdl-navigation__link mdl-typography--text-uppercase {{actived('/v/most')}}" [routerLink]="['/v/most']" go-top>Xem nhiều nhất</a>
                <a class="mdl-navigation__link mdl-typography--text-uppercase {{actived('/v/hot')}}" [routerLink]="['/v/hot']" go-top>Hot nhất</a>
              </nav>
            </div>
            <a class="android-mobile-title mdl-layout-title" [routerLink]="['/']">
              ClipVNet<small>.com</small>
            </a>
            <facebook-login *ngIf="!userService.currentUser" class="android-more-button"></facebook-login>
            <a id="inbox-button" class="android-more-button" href="javascript: void(0)" *ngIf="userService.currentUser">
              <span class="mdl-badge" data-badge="4">{{userService.currentUser.name}}</span>
            </a>
            <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="inbox-button" *ngIf="userService.currentUser">
              <user-menu [user]="userService.currentUser"></user-menu>
            </ul>
          </div>
        </div>

        <div class="android-drawer mdl-layout__drawer" *md nav-left>
          <span class="mdl-layout-title" *ngIf="userService.currentUser">
            {{userService.currentUser.name}}
          </span>
          <nav class="mdl-navigation">
            <a class="mdl-navigation__link {{actived('/')}}" [routerLink]="['/']" go-top>Mới nhất</a>
            <a class="mdl-navigation__link {{actived('/')}}" [routerLink]="['/v/most']" go-top>Xem nhiều nhất</a>
            <a class="mdl-navigation__link {{actived('/v/hot')}}" [routerLink]="['/v/hot']" go-top>Hot nhất</a>
          </nav>
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
              <a *ngFor="let k of keywords" style="float: left;" go-top class="mdl-button mdl-js-button" [routerLink]="['/k/'+k._id]">{{k.name}}</a>
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
  keywords: Array<any>;
  gsub: any;

  constructor(private zone: NgZone, private videoService: VideoService, private eventService: EventService, private router: Router, private userService: UserService){
    this.keywords = this.videoService.getKeywords();
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
          });
        }        
      }
    });
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  actived(path: string){
    return this.router.url === path ? 'actived' : '';
  }

  ngAfterViewInit() {            
    componentHandler.upgradeDom();
  }

  search(){    
    this.router.navigateByUrl('search/' + this.txtSearch + '?t=' + new Date().getTime());
  }
}


