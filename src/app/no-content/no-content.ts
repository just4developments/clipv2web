import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div>
      <h1>404: page missing</h1>
    </div>
  `,
  styles: ['h1 { padding-left: 20px; text-align: center; color: #CD3838}']
})
export class NoContent {

}
