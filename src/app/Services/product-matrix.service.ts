import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductMatrixService {

  url = environment.apiUrl;
  awsUrl = environment.awsUrl;
  constructor(private httpClient:HttpClient) { }

  Post_get_amazon_info_details(data:any):Observable<any>{
    const formData = new FormData();

    formData.append('query1',data.Keyword );
    formData.append('query2',data.Brand );
    formData.append('query3',data.features[0].feature );
   
    
    return this.httpClient.post<any>(this.url+'/get_CompetitorAnalyzer',formData); 

    //aws url
    // return this.httpClient.post<any>(this.awsUrl+'/get_CompetitorAnalyzer',formData); 
  }

  //   url:string= "http://localhost:3000/Search_result";
  
  // Post_productFeatureMatrix():Observable<any>{
  //   // const formData = new FormData();
  //   // formData.append('query1',data);
  //   // console.log(formData);
    
  //   return this.httpClient.get<any>(this.url); 
  // }

}
