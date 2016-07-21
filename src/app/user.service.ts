import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; 

import { Config } from './config';
import { HashService } from './hash.service';

declare var window: any;

@Injectable()
export class UserService {
	public currentUser: any;

  constructor(private http: Http){

	}

	login(user: any){
		this.currentUser = user;
	}

  loginSystem(user: any): Observable<any>{
  	return this.http.post(Config.HOST + '/login', {token: user.accessToken}, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) }))
      .map((res) => { return HashService.decrypt(res); } )
      .catch(this.handleError)    
  }

  save(){
    window.localStorage.user = JSON.stringify(this.currentUser);
  }

  logout(){    
    this.currentUser = undefined;
    delete window.localStorage.user;
  }


  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
