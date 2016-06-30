import { Input, OnInit, Directive, Output, EventEmitter, ElementRef, HostListener, AfterViewInit } from '@angular/core';

import { EventService } from './event.service';

///////////////////////////////////////////////////////////////////

@Directive({
  selector: '[scroll-bottom]'
})
export class MainScrollDirective implements OnInit {

  isNexting: number = 0;
 
  constructor(private eventService: EventService) {
    
  }

  ngOnInit() {
    this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'video-card-list' && data.action === 'loaded'){        
         this.isNexting = 0;
      }
    });
  }
 
  @HostListener('scroll', ['$event']) 
  onScroll(event: any) {
  	if(this.isNexting) return;
  	var e = event.target;
  	if(e.scrollTop + e.offsetHeight >= e.scrollHeight){
  		this.isNexting = 1;
      this.eventService.emit({com: 'video-card-list', action: 'load'});
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