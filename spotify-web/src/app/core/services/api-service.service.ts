import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  public post(url: string, data: any) {
    return this.http
      .post(this.apiUrl + url, data)
      .pipe(
        tap(
          (data) => {
            return Promise.resolve(data);
          },
          (error) => {
            return Promise.reject(data);
          }
        )
      )
      .toPromise();
  }

  public get(url: string) {
    return this.http
      .get(this.apiUrl + url, {})
      .pipe(
        tap(
          (data) => {
            return Promise.resolve(data);
          },
          (error) => {
            return Promise.reject();
          }
        )
      )
      .toPromise();
  }
}
