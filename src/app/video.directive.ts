import { Input, OnInit, OnDestroy, Directive, Output, EventEmitter, ElementRef, HostListener, AfterViewInit } from '@angular/core';

import { EventService } from './event.service';

///////////////////////////////////////////////////////////////////

@Directive({
  selector: '[scroll-bottom]'
})
export class MainScrollDirective implements OnInit, OnDestroy {

  isLoadedData: boolean;
  gsub: any;
 
  constructor(private eventService: EventService) {
    
  }

  ngOnInit() {
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'video-card-list'){
        if(this.isLoadedData === false && data.action === 'loaded')
          this.isLoadedData = true;
        else if (data.action === 'stop')
          this.isLoadedData = undefined;
        else if(this.isLoadedData === undefined && data.action === 'start')
          this.isLoadedData = false;
      }
    });
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }
 
  @HostListener('scroll', ['$event']) 
  onScroll(event: any) {
    if(!this.isLoadedData) return false;    
  	var e = event.target;
    var m = e.querySelector('#mainContent0');
  	if(e.scrollTop + e.offsetHeight >=   m.offsetHeight){
      this.isLoadedData = false;
      this.eventService.emit({com: 'video-card-list', action: 'append'});      
  	}
  }

}

@Directive({
  selector: '[enter]'
})
export class EnterDirective {
  @Output('enter') enter: EventEmitter<any> = new EventEmitter<any>();
 
  @HostListener('keypress', ['$event']) 
  onKeyPress(event: any) {
    if(event.keyCode === 13){      
      this.enter.emit(null);
    }
  }

}

@Directive({
  selector: '[select-when-focus]'
})
export class SelectWhenFocusDirective {
  
  @HostListener('focus', ['$event']) 
  onFocus(event: any) {
    event.target.select();
  }

}


///////////////////////////////////////////////////////////////////
declare var window: any;

@Directive({
    selector: '[go-top]'
})    
export class GoTop implements AfterViewInit {
  container: any;

  constructor(){
    
  }

  ngAfterViewInit() {
    this.container = window.document.querySelector('[scroll-bottom]');
  }

  @HostListener('click', ['$event']) 
  onClick(event: any){
    if(this.container.scrollTop !== 0){
      setTimeout(()=>{
        this.container.scrollTop = 0;
      }, 200);    
    }
  }
}

///////////////////////////////////////////////////////////////////
declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})    
export class MDL implements AfterViewInit {
	
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}

///////////////////////////////////////////////////////////////////
declare const FB:any;

@Directive({
    selector: '[facebook]'
})    
export class Facebook implements AfterViewInit {
  
  constructor() {    
    
  }

  ngAfterViewInit() {
    
  }
}