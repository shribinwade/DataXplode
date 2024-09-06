import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {

  constructor() { }

  private searchNewsData: any;

  setSearchData(data: any) {
 
    this.searchNewsData = data;
  }

  getSearchData() {
 
    
    return this.searchNewsData;
  }
}
