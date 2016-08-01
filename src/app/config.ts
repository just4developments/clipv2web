import { Injectable } from '@angular/core';

declare var ENV: any;

@Injectable()
export class Config {		
	FB_FANPAGE:string = "https://www.facebook.com/clipvnet/";

	get HOST():string {
		return 'development' === ENV ? 'http://localhost:8000' : 'http://clipvnet.com:8000';
	}
	get FB_APP_ID():string {
		return 'development' === ENV ? '850835344955953' : '291510107860506';
	}	
}