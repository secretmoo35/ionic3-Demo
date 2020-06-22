import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiProvider {

  isForceUpdate = false;
  isAuthorization = false;

  constructor(
    public http: HttpClient
  ) { }

  public async authorizationHeader() {
    let token = ``;
    return new HttpHeaders().set('Authorization', token);
  }

  getUser() {
    return this.get('https://randomuser.me/api/?results=500')
  }

  get(endpoint: string): Observable<any> {

    return Observable.create(async (observer: any) => {

      const headers = await this.authorizationHeader();

      if (!headers) {
        observer.error('No headers found.');
      }

      return this.http.get(endpoint, { headers: headers }).retry(3).take(1).timeout(30000).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      }, (error) => {
        console.log(error);
        observer.error(error);
      });

    });

  }

  getByID(endpoint: string, id: any): Observable<any> {

    return Observable.create(async (observer: any) => {

      const headers = await this.authorizationHeader();

      if (!headers) {
        observer.error('No headers found.');
      }

      return this.http.get(`${endpoint}/${id}`, { headers: headers }).retry(3).take(1).timeout(30000).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      }, (error) => {
        console.log(error);
        observer.error(error);
      });

    });

  }

  post(endpoint: string, body: any): Observable<any> {

    return Observable.create(async (observer: any) => {

      const headers = await this.authorizationHeader();

      if (!headers) {
        observer.error('No headers found.');
      }

      return this.http.post(endpoint, body, { headers: headers }).retry(3).take(1).timeout(30000).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      }, (error) => {
        console.log(error);
        observer.error(error);
      });

    });
  }

  put(endpoint: string, id: any, body: any): Observable<any> {

    return Observable.create(async (observer: any) => {

      const headers = await this.authorizationHeader();

      if (!headers) {
        observer.error('No headers found.');
      }

      return this.http.put(`${endpoint}/${id}`, body, { headers: headers }).retry(3).take(1).timeout(30000).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      }, (error) => {
        console.log(error);
        observer.error(error);
      });

    });
  }

  delete(endpoint: string, id: any): Observable<any> {

    return Observable.create(async (observer: any) => {

      const headers = await this.authorizationHeader();

      if (!headers) {
        observer.error('No headers found.');
      }

      return this.http.delete(`${endpoint} / ${id}`, { headers: headers }).retry(3).take(1).timeout(30000).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      }, (error) => {
        console.log(error);
        observer.error(error);
      });

    });
  }

  // for image base64 formData type
  public dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    return bb;
  }

}
