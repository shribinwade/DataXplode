import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiDataService {

  constructor() { }

  private searchData: any;
  private formData: any;

  setSearchData(data: any) {
    this.searchData = data;
  }

  getSearchData() {
    return this.searchData;
  }

  setFormData(formdata: any){
    this.formData = formdata;
  }
  getFormData(){
     return this.formData;
  }
  
  handleSubmit = new EventEmitter<string>();
  keywordSubmit = new EventEmitter<string>();

  triggerHandleSubmit() {
    this.handleSubmit.emit();
    this.keywordSubmit.emit();
  }
}
