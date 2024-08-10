import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiDataService {

  constructor() { }

  private searchData: any;

  setSearchData(data: any) {
    this.searchData = data;
  }

  getSearchData() {
    return this.searchData;
  }
  
  handleSubmit = new EventEmitter<string>();

  triggerHandleSubmit(searchValue: string) {
    this.handleSubmit.emit(searchValue);
  }
}
