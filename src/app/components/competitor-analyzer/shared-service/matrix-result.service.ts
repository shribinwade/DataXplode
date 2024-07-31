import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixResultService {

  constructor() { }
  private searchData: any;

  setSearchData(data: any) {
    this.searchData = data;
  }

  getSearchData() {
    return this.searchData;
  }
}
