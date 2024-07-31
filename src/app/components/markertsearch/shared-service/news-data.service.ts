import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {

  constructor() { }

  private searchNewsData: any;

  setSearchData(data: any) {
    console.log(this.searchNewsData);
    this.searchNewsData = data;
  }

  getSearchData() {
    console.log(this.searchNewsData);
    
    return this.searchNewsData;
  }
}
