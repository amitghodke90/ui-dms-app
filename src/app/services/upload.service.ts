import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private http: HttpClient) {}

  public upload(files: Set<File>): {[key: string]: Observable<number>} {


    return;
  }
  searchDocument(keyword: String): Observable<any> {
    return this.http.get(environment.baseURL + 'doc/' + keyword);
  }
  downloadDocument(file_name: String): Observable<any> {
    // http://localhost:10010/downloadFile?bucket=&file_name=
    return this.http.get(environment.baseURL + 'downloadFile?bucket=document&file_name=' + file_name );
  }
  uploadFile(file): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    // let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
    const requestOptions = {
        params: new HttpParams()
      };
    requestOptions.params.set('Content-Type', 'multipart/form-data');
    requestOptions.params.set('Accept', 'application/json');
    console.log(formData,'formData')
    return this.http.post(environment.baseURL + 'doc', formData, requestOptions);
  }

}
