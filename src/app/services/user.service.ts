import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = "http://localhost:8000";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  private httpHeadersFile = new HttpHeaders({
    // 'Content-Type': undefined,
    'Accept': '*/*',
  })



  constructor(private http: HttpClient){}


  getMsg():Observable<any>{
    return this.http.get(`${this.urlBase}/ping`)
  }

  addPost(item:Object):Observable<Object>{
    return this.http.post(this.urlBase + '/newsfeed', item, {headers:this.httpHeaders});
  }

  addFile(file:any):Observable<Object>{
    return this.http.post(this.urlBase + '/upload', file, {headers:this.httpHeadersFile});
  }
}
