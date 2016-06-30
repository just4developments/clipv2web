import { Input, OnInit, Directive, Output, EventEmitter, ElementRef, HostListener, AfterViewInit } from '@angular/core';

export class EventService {
  emitter: EventEmitter<any> = new EventEmitter<any>(true);
  constructor() {

  }
  emit(data: any){
  	this.emitter.emit(data);
  }
  
}