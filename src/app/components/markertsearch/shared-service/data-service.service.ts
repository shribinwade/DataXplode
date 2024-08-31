import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  private searchDataSubject = new BehaviorSubject<any>(null);

  setSearchData(data: any) {
    this.searchDataSubject.next(data); // Emit new data
  }

  getSearchData() {
    return this.searchDataSubject.asObservable(); // Return as observable
  }


  // private searchData: any;

  // setSearchData(data: any) {
  //   this.searchData = data;
  // }

  // getSearchData() {
  //   return this.searchData;
  // }
}
