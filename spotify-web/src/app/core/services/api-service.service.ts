import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthTokenService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'https://api.spotify.com/v1';
  client_id = 'cf6854fe87b6471e8c5dc3ac3e0dfd56';
  client_secret = 'b20c7daf47984966bc52cd609371f55b';

  constructor(
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) {}

  private getHeaders(force: boolean): Promise<HttpHeaders> {
    return Promise.resolve(
      this.authTokenService.authenticate(force).then((res) => {
        return Promise.resolve(
          new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${res}`)
        );
      })
    );
  }

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
    return this.internalGet(url, 1);
  }

  private internalGet(url: string, tryNum: number) {
    return this.getHeaders(false).then(headers => {
      return this.http
        .get(this.apiUrl + url, {headers: headers})
        .pipe(
          tap(
            (data) => {
              return Promise.resolve(data);
            },
            (error) => {
              if(error.statusCode == 401) {
                return this.getHeaders(true).then(res => {
                  if(tryNum < 5) {
                    return this.internalGet(url, tryNum + 1);
                  }
                });
              }
              return Promise.reject();
            }
          )
        )
        .toPromise();
      })
  }
  

  getAuth = () => {};
}
