import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
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
    // console.log(this.route.component);
    
    this.router.navigate(['keyword-data-search'], { relativeTo: this.route });

    // this.router.events.subscribe(() => {
    //   const routeSnapshot = this.router.routerState.snapshot.root;
    //   const activeComponentName = this.findComponentName(routeSnapshot);
    //   console.log('Active Component:', activeComponentName);
    // });

  }
  // private findComponentName(routeSnapshot: ActivatedRouteSnapshot): string {
  //   const component = routeSnapshot.routeConfig?.component;
  //   if (component) {
  //     return (component as any).name; // Get the component class name
  //   }

  //   for (let child of routeSnapshot.children) {
  //     const childComponentName = this.findComponentName(child);
  //     if (childComponentName) {
  //       return childComponentName;
  //     }
  //   }

  //   return 'Unknown Component';
  // }

  keywordSubmit() {
    
    const formdata = this.keywordSearchForm.value;
    const value: string = formdata.search;

    this.sharedService.setSearchData(value);

    this.sharedService.triggerHandleSubmit();
  }
}
