import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/Rx'; 

import { Config } from './config';

import { UserService } from './user.service';
import { HashService } from './hash.service';

export class VideoCard {
  _id: string;
  link: string;
  title: string;
  title0: string;
  image: string;
  creator: string;
  updateat: Date;
  longtime: number;
  youtubeid: string;
  viewcount: number;
  keywords: Array<any>;
  nowOnTime: string;
}

export class VideoDetails {
  _id: string;
  link: string;
  title: string;
  title0: string;
  image: string;
  creator: string;
  updateat: Date;
  longtime: number;
  youtubeid: string;
  viewcount: number;
  keywords: Array<any>;
  nowOnTime: string;
}

@Injectable()
export class VideoService {
  keywords: Array<any>;

	constructor(private http: Http, private userService: UserService){
    this.http.get(Config.HOST + '/keywords')
          .map((res) => { return res; } )
          .catch(this.handleError).subscribe((keywords: Array<any>) => {
          this.keywords = keywords;
        }, (err: any) => { console.error(err); });;
	}

  fromNowOn(v:any){
    if(!v) return v;
    var now = new Date();    
    let handleVideo = (v: any) => {
      var t0 = (now.getTime() - new Date(v.updateat).getTime());
      var str = '';
      var t = Math.floor(t0/1000/60/60/24);
      if(t > 0) str = t + ' ngày';
      else {
        t = Math.floor(t0/1000/60/60);
        if(t > 0) str = t + ' giờ';
        else {
          t = Math.floor(t0/1000/60);
          if(t > 0) str = t + ' phút';
          else {
            t = Math.floor(t0/1000);
            if(t > 0) str = t + ' giây';
          }
        }
      }      
      v.nowOnTime = str + ' trước';
      return v;
    };
    if(v instanceof Array){
      for(var i in v){
        v[i] = handleVideo(v[i]);
      }
    }else{
      v = handleVideo(v);
    }
    return v;
  }

  getYoutube(id: string): Observable<VideoCard[]> {
    return this.http.get(Config.HOST + '/youtube/' + id)
          .map((res:any) => { return HashService.decrypt(res); } )
          .catch(this.handleError);
  }

  searchVideos(txtSearch: string, meta:any): Observable<VideoCard[]> {
    return this.http.get(Config.HOST + '/video/search?txtSearch=' + txtSearch + '&page=' + meta.page + "&rows=" + meta.rows)
          .map((res:any) => { return this.fromNowOn(HashService.decrypt(res)); } )
          .catch(this.handleError);
  }

  getKeywords(){
    return this.keywords;
  }

  getKeywordVideos(keyword: string, meta:any): Observable<VideoCard[]> {
    return this.http.get(Config.HOST + '/video/keyword?keyword=' + keyword + '&page=' + meta.page + "&rows=" + meta.rows)
          .map((res:any) => { return HashService.decrypt(res) } )
          .catch(this.handleError);
  }

	getNewestVideos(meta:any): Observable<VideoCard[]> {
		return this.http.get(Config.HOST + '/video/newest?page=' + meta.page + "&rows=" + meta.rows)
          .map((res:any) => { return this.fromNowOn(HashService.decrypt(res)); } )
          .catch(this.handleError);
	}

	getMostVideos(meta:any): Observable<VideoCard[]> {
		return this.http.get(Config.HOST + '/video/most?page=' + meta.page + "&rows=" + meta.rows)
          .map((res:any) => { return this.fromNowOn(HashService.decrypt(res)); } )
          .catch(this.handleError);
	}

  getHotVideos(meta:any): Observable<VideoCard[]> {
    return this.http.get(Config.HOST + '/video/hot?page=' + meta.page + "&rows=" + meta.rows)
          .map((res:any) => { return this.fromNowOn(HashService.decrypt(res)); } )
          .catch(this.handleError);
  }

	getRelateVideos(id: string, keywords: Array<any>, updateat: string, meta: any): Observable<VideoCard[]> {
    var s = '';
    for(var i in keywords){
      var k = keywords[i];
      if(s.length > 0) s += ',';
      s += '' + k._id;
    }
		return this.http.get(Config.HOST + '/video/relate?id=' + id + '&keywords=' + s + '&updateat=' + updateat + '&page=' + meta.page + "&rows=" + meta.rows)
          .map((res:any) => { return this.fromNowOn(HashService.decrypt(res)); } )
          .catch(this.handleError);
	}	

	getVideo(id: string): Observable<VideoDetails>{
		return this.http.get(Config.HOST + '/video/'+id)
          .map((res:any) => { return HashService.decrypt(res); } )
          .catch(this.handleError);
	}

  addVideo(v: any): Observable<VideoCard[]> {
     return this.http.post(Config.HOST + '/video', v, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'me': this.userService.currentUser._id }) }))
          .map((res:any) => { return HashService.decrypt(res); } )
          .catch(this.handleError); 
  }

  addFavorite(v: any): Observable<VideoCard[]> {
     return this.http.post(Config.HOST + '/favorite', v, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'me': this.userService.currentUser._id }) }))
          .map((res:any) => { return HashService.decrypt(res); } )
          .catch(this.handleError); 
  }

  removeVideo(id: any): Observable<VideoCard[]> {
     return this.http.delete(Config.HOST + '/video/' + id, new RequestOptions({ headers: new Headers({ 'me': this.userService.currentUser._id }) }))
          .map((res:any) => { return HashService.decrypt(res); } )
          .catch(this.handleError); 
  }

  removeFavorite(id: any): Observable<VideoCard[]> {
     return this.http.delete(Config.HOST + '/favorite/' + id, new RequestOptions({ headers: new Headers({ 'me': this.userService.currentUser._id }) }))
          .map((res:any) => { return HashService.decrypt(res); } )
          .catch(this.handleError); 
  }

  getMyVideo(): Observable<VideoCard[]> {
    return this.http.get(Config.HOST + '/myvideo', new RequestOptions({ headers: new Headers({ 'me': this.userService.currentUser._id }) }))
          .map((res:any) => { return HashService.decrypt(res); } )
          .catch(this.handleError); 
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