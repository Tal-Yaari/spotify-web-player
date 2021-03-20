import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthTokenService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'https://api.spotify.com/v1';
  accessToken;

  constructor(
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) {}

  private getHeaders(force: boolean): Promise<HttpHeaders> {
    return Promise.resolve(
      this.authTokenService.authenticate(force).then((res) => {
        this.accessToken = res;
        return Promise.resolve(
          new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.accessToken}`)
        );
      })
    );
  }

  public delete(url: string) {
    return this.internalDelete(url, 1);
  }

  private internalDelete(url: string, tryNum: number) {
    return this.getHeaders(false).then(headers => {
      return this.http
        .delete(this.apiUrl + url, {headers: headers})
        .pipe(
          tap(
            (data) => {
              return Promise.resolve(data);
            },
            (error) => {
              if(error.status == 401) {
                return this.getHeaders(true).then(res => {
                  if(tryNum < 5) {
                    return this.internalDelete(url,  tryNum + 1);
                  }
                });
              }
              return Promise.reject();
            }
          )
        )
        .toPromise();
          });
  }

  public put(url: string, data: any) {
    return this.internalPut(url, data, 1);
  }

  private internalPut(url: string, data: any, tryNum: number) {
    return this.getHeaders(false).then(headers => {
      return this.http
        .put(this.apiUrl + url, {ids:data}, {headers: headers})
        .pipe(
          tap(
            (data) => {
              return Promise.resolve(data);
            },
            (error) => {
              if(error.status == 401) {
                return this.getHeaders(true).then(res => {
                  if(tryNum < 5) {
                    return this.internalPut(url,data, tryNum + 1);
                  }
                });
              }
              return Promise.reject();
            }
          )
        )
        .toPromise();
          });
  }

  public post(url: string, data: any) {
    return this.internalPost(url, 1, data);
  }

  private internalPost(url: string, tryNum: number, data: any) {
    return this.getHeaders(false).then(headers => {
      return this.http
        .post(this.apiUrl + url, data, {headers: headers})
        .pipe(
          tap(
            (data) => {
              return Promise.resolve(data);
            },
            (error) => {
              if(error.status == 401) {
                return this.getHeaders(true).then(res => {
                  if(tryNum < 5) {
                    return this.internalPost(url, tryNum + 1, data);
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
              if(error.status == 401) {
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
}
