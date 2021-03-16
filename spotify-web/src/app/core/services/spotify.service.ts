import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  client_id = 'cf6854fe87b6471e8c5dc3ac3e0dfd56';
  client_secret = 'b20c7daf47984966bc52cd609371f55b';

  constructor(private http: HttpClient) {}

  static authToken: string = '';

  authenticate(force: boolean): Promise<string> {
    if (AuthTokenService.authToken != '' && !force) {
      return Promise.resolve(AuthTokenService.authToken);
    }

    let headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.client_id + ':' + this.client_secret),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();
    return this.http
      .post('https://accounts.spotify.com/api/token', body, {
        headers: headers,
      }).toPromise().then((res: any) => {
        console.log('res', res);
        AuthTokenService.authToken = res.access_token;
        return res.access_token;
      });
  }
}
