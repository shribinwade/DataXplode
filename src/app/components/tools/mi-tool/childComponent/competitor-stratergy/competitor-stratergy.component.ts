import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MiDataService } from '../../../mi-service/mi-data.service';

@Component({
  selector: 'app-competitor-stratergy',
  templateUrl: './competitor-stratergy.component.html',
  styleUrl: './competitor-stratergy.component.scss'
})
export class CompetitorStratergyComponent implements OnInit {

  StratergySearchFormControl!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: MiDataService,
    private elementRef: ElementRef
  ){}


  ngOnInit(): void {
    this.StratergySearchFormControl=this.formBuilder.group({
          search:['']
    });
    this.router.navigate(['porter-statergy'], { relativeTo: this.route })  }

  StratergySubmit(){
    const data2 = this.StratergySearchFormControl.get('search')?.value;
    console.log(data2);
    
    const value= this.StratergySearchFormControl.value;
    const data =value.search;
    console.log(data);
     


    this.sharedService.setSearchData(data);

    this.sharedService.triggerHandleSubmit();
  }

}
