import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = "http://localhost:8080/convert/youtube";
  
  constructor(private http: HttpClient) {}

  createYoutubeLink(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }
}
