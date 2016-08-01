import { OnInit, OnDestroy, Directive, Output, EventEmitter, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

import { EventService } from './event.service';

@Directive({
  selector: '[scroll-bottom]'
})
export class MainScrollDirective implements OnInit, OnDestroy {

  rightCol: any;
  isLoadedData: boolean;
  gsub: any;
  m: any;
  document: DomAdapter = getDOM();
 
  constructor(private eventService: EventService, private e: ElementRef) {
    
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
    
    var m:any = this.document.query('#mainContent0');
    if(!m) return this.isLoadedData = undefined;
  	if(this.e.nativeElement.scrollTop + this.e.nativeElement.offsetHeight >= m.offsetHeight){
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

@Directive({
    selector: '[go-top]'
})    
export class GoTop implements AfterViewInit {
  container: any;
  document: DomAdapter = getDOM();

  constructor(){
    
  }

  ngAfterViewInit() {
    this.container = this.document.query('[scroll-bottom]');
  }

  @HostListener('click', ['$event']) 
  onClick(event: any){
    if(event.which === 1 && this.container.scrollTop !== 0){
      setTimeout(()=>{
        this.container.scrollTop = 0;
      }, 200);    
    }
  }
}

@Directive({
    selector: '[nav-left]'
})    
export class NavLeft {
  container: any;
  document: DomAdapter = getDOM();

  constructor(private e: ElementRef){
    
  }

  @HostListener('click', ['$event']) 
  onClick(event: any){
    if(event.which === 1){
      this.document.query('.mdl-layout__obfuscator').classList.remove('is-visible');
      this.e.nativeElement.classList.remove('is-visible');
    }
  }
}