import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/Rx'; 

export class VideoCard {
  id: string;
  link: string;
  title: string;
  image: string;
  creator: string;
  updateat: Date;
  longtime: number;
  youtubeid: string;
  viewcount: number;
}

@Injectable()
export class VideoService {
	constructor(private http: Http){

	}

	getNewestVideos(meta:any): Observable<VideoCard[]> {
		return this.http.get('http://localhost:8000/video/newest')
          .map(this.extractData)
          .catch(this.handleError);
	}

	getMostVideos(meta:any): Observable<VideoCard[]> {
		return this.http.get('http://localhost:8000/video/most')
          .map(this.extractData)
          .catch(this.handleError);
	}

	getRelateVideos(id: string): Observable<VideoCard[]> {
		return this.http.get('http://localhost:8000/video/relate')
          .map(this.extractData)
          .catch(this.handleError);
	}	

	getVideo(id: string): Observable<VideoCard>{
		return this.http.get('http://localhost:8000/video/'+id)
          .map(this.extractData)
          .catch(this.handleError);
	}

	private extractData(res: Response) {
    return res.json();
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