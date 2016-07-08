import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
	public currentUser: any;

  constructor(){

	}

  login(user: any){
    this.currentUser = user;
  }

  logout(){
    this.currentUser = undefined;
  }
}