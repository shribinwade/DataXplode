import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatentService {

  

  url = environment.apiUrl;
  awsUrl = environment.awsUrl;

  constructor(private httpClient:HttpClient) { }
  
  Post_get_patent_info_details(data:any):Observable<any>{
  //   summary = query1
	// title = query2
	// search_d=query3
	// keyword=query4
  console.log(data);
  
    const formData = new FormData();
    formData.append('query1',data.summary);
    formData.append('query2',data.title);
    // formData.append('query3',data);
    formData.append('query4',data.keyword);

    console.log(formData.getAll);
    
    // return this.httpClient.post<any>(this.url+'/get_data_IP',formData); 

    //aws url
       return this.httpClient.post<any>(this.awsUrl+'/get_data_IP',formData); 
  }
}
