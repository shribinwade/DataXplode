import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StratergysearchService {

  url = environment.apiUrl;
  awsUrl = environment.awsUrl;
  constructor(private httpClient:HttpClient) { }

  post_get_competitive_stratergy_details(data:any):Observable<any>{


    const formData = new FormData();

   
    
    
    formData.append('query1',data);

     return this.httpClient.post<any>(this.url+'/get_porterforces',formData); 
     //aws url
    //  return this.httpClient.post<any>(this.awsUrl+'/get_porterforces',formData);

  }
}
