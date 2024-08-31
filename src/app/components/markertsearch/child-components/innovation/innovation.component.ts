import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatentService } from '../../../../Services/patent.service';
import { LoadingService } from '../../../../Services/loading.service';
import { finalize } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInOutAnimation } from '../../../../shared/animations';

interface patentdata {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  index: IndexItem[];
  result: Result;
}

interface IndexItem {
  id: string;
  name: string;
}

interface Result {
  [key: string]: value[]; // The values are arrays. Adjust the type of elements if you have specific types.
}

interface value{
  patent_number:any;
  applicant:any;
}

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrl: './innovation.component.scss',
  animations: [fadeInOutAnimation]
})
export class InnovationComponent implements OnInit{


  patentSearchForm:any = FormGroup;
  patentData!:patentdata;
  resultData:any;
  dataSource = new MatTableDataSource<value>();

  displayedColumns: string[] = ['index', 'patentnumber', 'applicant'];

  constructor(
    private formBuilder:FormBuilder,
    private patenservice: PatentService,
    public loadingService:LoadingService,
  ){}

 
  


  ngOnInit(): void {
     this.patentSearchForm = this.formBuilder.group({
      title:[''],
      patentNumber:[''],
      type:[''],
      keyword:['']
  })
  }


  handleSubmit(){
    this.loadingService.setChildState(true);

    const formdata = this.patentSearchForm.value;
    console.log(formdata);

    this.patenservice.Post_get_patent_info_details(formdata).pipe(
      finalize(() => {
        this.loadingService.setChildState(false);
      })
    ).subscribe(res => {

      this.loadingService.setChildState(false);
       
      this.patentData = res;
     
      this.resultData = this.patentData.data.result;
      
      let keydata!:any;

      const highestResult = this.findHighestResult(this.resultData);
        if (highestResult) {
           keydata = highestResult.key;
           console.log(`Highest result is for key ${highestResult.key} with ${highestResult.value.length} elements.`);
        } else {
            console.log('No results found.');
        }
      
        this.dataSource = new MatTableDataSource<value>(this.patentData.data.result[keydata])
       
        console.log(this.patentData.data.result[keydata]);
        
      },
      error => {
        console.error('Error fetching search results:', error);
        // Handle error here if needed
      });
      
   
      
      

    
  }

  // Function to find the result with the highest number of elements
 findHighestResult(result: Result): { key: string, value: any[] } | null {
  let highestKey: string | null = null;
  let highestValue: any[] = [];

  for (const key in result) {
      if (result.hasOwnProperty(key)) {
          const value = result[key];
          if (value.length > highestValue.length) {
              highestKey = key;
              highestValue = value;
          }
      }
  }

  return highestKey ? { key: highestKey, value: highestValue } : null;
}



// Usage

  

}
