import { Component, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {Location} from '@angular/common';

import { VideoDetailsPageComponent, VideoPageComponent } from './video.component';
import { FacebookLoginComponent, FacebookComponent } from './facebook.component';
import { MainScrollDirective, MDL, GoTop } from './video.directive';
import { EventService } from './event.service';

declare var componentHandler: any;

@Component({
    selector: 'my-app',
    template: `
      <facebook></facebook>
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header" mdl>
        <div class="android-header mdl-layout__header mdl-layout__header--waterfall">
          <div class="mdl-layout__header-row">
            <span class="android-title mdl-layout-title">
              <img class="android-logo-image" src="images/android-logo.png">
            </span>
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
                <input class="mdl-textfield__input" type="text" id="search-field" [(ngModel)]="txtSearch" (keypress)="search($event)">
              </div>              
            </div>            
            <facebook-login (login)="login($event)" *ngIf="!user"></facebook-login>
            <!-- Navigation -->
            <div class="android-navigation-container">
              <nav class="android-navigation mdl-navigation">
                <a class="mdl-navigation__link mdl-typography--text-uppercase" [routerLink]="['/']" go-top>Newest</a>
                <a class="mdl-navigation__link mdl-typography--text-uppercase" [routerLink]="['/v/most']" go-top>Most</a>
                <a class="mdl-navigation__link mdl-typography--text-uppercase" [routerLink]="['/v/hot']" go-top>Hot</a>
              </nav>
            </div>
            <span class="android-mobile-title mdl-layout-title">
              <img class="android-logo-image" src="images/android-logo.png">
            </span>
            <button class="android-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button" *ngIf="user">
              <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="more-button" *ngIf="user">
              <li class="mdl-menu__item">{{user.name}}</li>
              <li class="mdl-menu__item">Post</li>
              <li disabled class="mdl-menu__item">Messages</li>
            </ul>
          </div>
        </div>
        <div class="android-content mdl-layout__content" align="center" scroll-bottom>
          <div align="left" id="mainContent">
            <router-outlet></router-outlet>
          </div>
          <footer class="android-footer mdl-mega-footer" id="footer">
            <div class="mdl-mega-footer--top-section">
              <div class="mdl-mega-footer--right-section">
                <a class="mdl-typography--font-light" href="#top">
                  Back to Top
                  <i class="material-icons">expand_less</i>
                </a>
              </div>
            </div>
            <div class="mdl-mega-footer--middle-section">
              <p class="mdl-typography--font-light">Satellite imagery: © 2014 Astrium, DigitalGlobe</p>
              <p class="mdl-typography--font-light">Some features and devices may not be available in all areas</p>
            </div>
          </footer>
        </div>  
      </div>
    `,
    directives: [MainScrollDirective, MDL, GoTop, ROUTER_DIRECTIVES, FacebookLoginComponent, FacebookComponent]
})
export class AppComponent implements AfterViewInit {
  user: any;
  txtSearch: string;

	constructor(private eventService: EventService, private router: Router){
		
	}

  ngAfterViewInit() {            
    componentHandler.upgradeDom();
  }

  login(event: any){    
    if(event){
      this.user = event;
      setTimeout(() => {
        componentHandler.upgradeDom();
      });      
    }
  }

  search(event: any){    
    if(event.keyCode === 13){
      this.router.navigateByUrl('search/' + this.txtSearch);
    }
  }
}


