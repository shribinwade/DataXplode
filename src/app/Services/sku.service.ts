import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkuService {


  url = environment.apiUrl;
  awsUrl = environment.awsUrl;
  constructor(private httpClient:HttpClient) { }
  
 
  
  Post_get_amazon_info_details(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('query1',data );
    // return this.httpClient.post<any>(this.url+'/get_amazon_info_details',formData); 
    
    // aws url
    return this.httpClient.post<any>(this.awsUrl+'/get_amazon_info_details',formData); 

  }

  Post_get_amazon_info_reviews(data:any):Observable<any>{
    debugger
    const formData = new FormData();
    console.log(data);
    
    formData.append('query1',data);

    return this.httpClient.post<any>(this.url+'/get_amazon_info_reviews',formData);

    //aws url
    // return this.httpClient.post<any>(this.awsUrl+'/get_amazon_info_reviews',formData);
  }
}
