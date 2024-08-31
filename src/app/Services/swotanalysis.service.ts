import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwotanalysisService {
  url = environment.apiUrl;
  awsUrl = environment.awsUrl;
   modifiedData = {};

  constructor(private httpClient: HttpClient) {
  }
  // Post_Swot(data:any):Observable<any>{
  //   const formData = new FormData();
  //   formData.append('query1',data );
  //   return this.httpClient.post<any>(this.url+'/get_amazon_info_details',formData); 
    
  //   // aws url
  //   // return this.httpClient.post<any>(this.awsUrl+'/get_amazon_info_details',formData); 

  // }

  Post_get_swot_analyzer(data:string[]):Observable<any>{
    const formData = new FormData();

   
      formData.append('query1',data[0]);
      formData.append('query2',data[1]);

      console.log(data[0]);
      console.log(data[1]);
      // return this.httpClient.post<any>(`${this.url}/get_swot_analyzer`, formData);
      return this.httpClient.post<any>(`${this.awsUrl}/get_swot_analyzer`,formData);
      
      // return new Observable;
    
     
    // formData.append('query1',data)
    // formData.append('query2',data)
    // return this.httpClient.post<any>(this.url+'/get_swot_analyzer',formData);
   
   
  } 

  
}
