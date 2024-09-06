import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  // http://35.154.43.111/docs#/
  
  url = environment.apiUrl;
  awsUrl = environment.awsUrl;
  
  constructor(private httpClient:HttpClient) { }
  
 
  
  Post_get_amazon_info_details(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('query1',data);
   
    
    //localurl
       return this.httpClient.post<any>(this.url+'/get_amazon_keyword_details',formData); 

    //aws ec2 url
      //  return this.httpClient.post<any>(this.awsUrl+'/get_amazon_keyword_details',formData); 
  }
}
