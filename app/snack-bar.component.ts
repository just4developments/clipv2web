import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { EventService } from './event.service';

declare var componentHandler: any;

@Component({
    selector: 'snack-bar',
    template: `
      <div class="mdl-js-snackbar mdl-snackbar">
        <div class="mdl-snackbar__text"></div>
        <button class="mdl-snackbar__action" type="button"></button>
      </div>
    `,
    directives: []
})
export class SnackBarComponent implements OnInit, OnDestroy { 
  snackbarContainer: any;
  gsub: any;

  constructor(private e: ElementRef, private eventService: EventService){
    
  }

  ngOnInit(){
    this.snackbarContainer = this.e.nativeElement.querySelector('.mdl-snackbar');
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'snack-bar'){
        this.snackbarContainer.MaterialSnackbar.showSnackbar({message: data.msg});
      }
    });
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

}