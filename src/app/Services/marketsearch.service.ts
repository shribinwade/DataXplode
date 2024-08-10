import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class MarketsearchService {

  url = environment.apiUrl;
  awsUrl = environment.awsUrl;
  constructor(private httpClient:HttpClient) { }
  
 
  
  Post_search_brand_details(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('query1',data);
    console.log(formData);
    
    // return this.httpClient.post<any>(this.url+'/get_brand_details',formData); 

    //aws url
     return this.httpClient.post<any>(this.awsUrl+'/get_brand_details',formData); 
  }

  //Get News from brand search
  Post_search_brand_details_and_news(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('query1',data);
    console.log(formData.get('query1'));
    //  return this.httpClient.post<any>(this.url+'/get_search_brand_details',formData);

    //aws url
    return this.httpClient.post<any>(this.awsUrl+'/get_search_brand_details',formData);
  }

  // url:string= "http://localhost:3000/data";
  
  // Post_search_brand_details():Observable<any>{
  //   // const formData = new FormData();
  //   // formData.append('query1',data);
  //   // console.log(formData);
    
  //   return this.httpClient.get<any>(this.url); 
  // }
  
}
