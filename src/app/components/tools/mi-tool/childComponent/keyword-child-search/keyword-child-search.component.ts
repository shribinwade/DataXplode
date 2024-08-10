import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MiDataService } from '../../../mi-service/mi-data.service';

@Component({
  selector: 'app-keyword-child-search',
  templateUrl: './keyword-child-search.component.html',
  styleUrl: './keyword-child-search.component.scss',
})
export class KeywordChildSearchComponent implements OnInit {
  keywordSearchForm: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: MiDataService,
    private elementRef: ElementRef
  ) {
    
  }

  ngOnInit(): void {
    this.keywordSearchForm = this.formBuilder.group({
      search: [''],
    });
    this.router.navigate([{ outlets: { service: ['keyword'] } }], {relativeTo: this.route});
  
   
  }

  keywordSubmit() {
    
   
    const formdata = this.keywordSearchForm.value;
    const value: string = formdata.search;

    this.sharedService.setSearchData(value);

    this.sharedService.triggerHandleSubmit(value);
    this.router.navigate([{ outlets: { service: ['keyword'] } }], {relativeTo: this.route});
  }
}
