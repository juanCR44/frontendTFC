import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import {Response} from "./response";

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

  addFile(file:any):Observable<Object>{
    return this.http.post(this.urlBase + '/upload', file, {headers:this.httpHeadersFile});
  }
  enviarSintoma(sintoma:string[]):Observable<Response>{
    return this.http.post<Response>(this.urlBase + '/sintoma', sintoma, {headers:this.httpHeaders});
  }

  getSintoma():Observable<any>{
    return this.http.get(this.urlBase + '/respuesta');
  }
}
