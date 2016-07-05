import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/Rx'; 

export class VideoCard {
  id: string;
  link: string;
  title: string;
  utitle: string;
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
  id: string;
  link: string;
  title: string;
  utitle: string;
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
	constructor(private http: Http){

	}

  fromNowOn(v:any){
    if(!v) return v;
    var now = new Date();
    for(var i in v){
      var t0 = (now.getTime() - new Date(v[i].updateat).getTime());
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
      v[i].nowOnTime = str + ' trước';
    }
    
    return v;
  }

  searchVideos(txtSearch: string, meta:any): Observable<VideoCard[]> {
    return this.http.get('http://localhost:8000/video/search?txtSearch=' + txtSearch + '&page=' + meta.page + "&rows=" + meta.rows)
          .map((res) => { return this.fromNowOn(res.json()); } )
          .catch(this.handleError);
  }

  getKeywords(){
    return this.http.get('http://localhost:8000/keywords')
          .map((res) => { return res.json(); } )
          .catch(this.handleError);
  }

  getKeywordVideos(keyword: string, meta:any): Observable<VideoCard[]> {
    return this.http.get('http://localhost:8000/video/keyword?keyword=' + keyword + '&page=' + meta.page + "&rows=" + meta.rows)
          .map((res) => { return res.json(); } )
          .catch(this.handleError);
  }

	getNewestVideos(meta:any): Observable<VideoCard[]> {
		return this.http.get('http://localhost:8000/video/newest?page=' + meta.page + "&rows=" + meta.rows)
          .map((res) => { return this.fromNowOn(res.json()); } )
          .catch(this.handleError);
	}

	getMostVideos(meta:any): Observable<VideoCard[]> {
		return this.http.get('http://localhost:8000/video/most?page=' + meta.page + "&rows=" + meta.rows)
          .map((res) => { return this.fromNowOn(res.json()); } )
          .catch(this.handleError);
	}

  getHotVideos(meta:any): Observable<VideoCard[]> {
    return this.http.get('http://localhost:8000/video/hot?page=' + meta.page + "&rows=" + meta.rows)
          .map((res) => { return this.fromNowOn(res.json()); } )
          .catch(this.handleError);
  }

	getRelateVideos(id: string, meta: any): Observable<VideoCard[]> {
		return this.http.get('http://localhost:8000/video/relate?id=' + id + '&page=' + meta.page + "&rows=" + meta.rows)
          .map((res) => { return this.fromNowOn(res.json()); } )
          .catch(this.handleError);
	}	

	getVideo(id: string): Observable<VideoDetails>{
		return this.http.get('http://localhost:8000/video/'+id)
          .map((res) => { return res.json(); } )
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