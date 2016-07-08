import {Pipe, PipeTransform} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'HowlongPipe'
})
export class HowlongPipe implements PipeTransform {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(str: any) {  	
  	if(!str) return str;
    return str.replace('H', 'g').replace('M', 'p').replace('S', '"');
  }

}