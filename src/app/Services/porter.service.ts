import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorterService {


  url = environment.apiUrl;
  awsUrl = environment.awsUrl;
  constructor(private httpClient:HttpClient) { }

  post_get_porter_supplier_details(data:any):Observable<any>{


    const formData = new FormData();

    console.log(data);
    
    
    formData.append('query1',data);

    // return this.httpClient.post<any>(this.url+'/get_supplier',formData); 

    //aws url
       return this.httpClient.post<any>(this.awsUrl+'/get_supplier',formData);
      

  }



 
}
