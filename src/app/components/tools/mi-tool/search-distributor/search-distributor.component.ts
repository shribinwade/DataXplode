import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { LoadingService } from '../../../../Services/loading.service';
import { PorterService } from '../../../../Services/porter.service';
import { DataServiceService } from '../../../markertsearch/shared-service/data-service.service';
import { MiDataService } from '../../mi-service/mi-data.service';
import { fadeInOutAnimation } from '../../../../shared/animations';
import { SnackbarService } from '../../../../Services/snackbar.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface treadSupplier{
  Supplier_list:Supplier_list[];
  Page_no: number;
}

interface Supplier_list {
  Address: string;
  business_type:string;
  catalog_url:string;
  co_name:string;
  default_email:string;
  default_mobile:string;
}

@Component({
  selector: 'app-search-distributor',
  templateUrl: './search-distributor.component.html',
  styleUrl: './search-distributor.component.scss',
  animations: [fadeInOutAnimation]
})
export class SearchDistributorComponent implements OnInit, AfterViewInit, OnDestroy  {

  searchFormControl: any = FormGroup;
  searchLocationFormControl: any = FormGroup;
  porterSupplierData!:treadSupplier;
  suppliers: Supplier_list[] = [];

  public pageSlice = this.suppliers;
  displayedColumns: string[] = ['index','co_name', 'Address', 'default_mobile','default_email', 'business_type', 'catalog_url'];
  
  dataSource = new MatTableDataSource<Supplier_list>(this.pageSlice);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  
  private subscription!: Subscription;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    public loadingService: LoadingService,
    private sharedService: MiDataService,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private porterService: PorterService,
    private globalSnackbar: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.searchFormControl = this.formBuilder.group({
      search: ['']
    })

   this.searchLocationFormControl =this.formBuilder.group({
      searchLocation:['']
    })

    this.subscription = this.sharedService.handleSubmit.subscribe(() =>{
      this.supplierSubmit();
    }) 

  }

  supplierSubmit() {

    //Getting searchFormData using service
    const data=this.sharedService.getSearchData();

    if (data != undefined) {
      //loading state start
      this.loadingService.setChildState(true);

      //Calling api for 
      this.porterService.post_get_porter_supplier_details(data).pipe(
       
        finalize(() => {
          //Stoping Loading after complete response
          this.loadingService.setChildState(false);
        })
      ).subscribe(res => {
        
        // Check the structure of `res`
       

        // Ensure `Search_result` exists and is an array
        if (res && Array.isArray(res.Search_result)) {
            //showing pop up after result
            const snackBarRef = this.globalSnackbar.showSuccess('Search Successful', 'View Result');

          // Flatten Supplier_list arrays from all pages
          this.suppliers = res.Search_result.flatMap((page: any) => page.Supplier_list || []);

         
      
          this.updatePageSlice();

        }
         else {
          console.error('Search_result is not defined or not an array:', res);
        }
        this.loadingService.setChildState(false);

      },
        error => {
          const snackBarRef = this.globalSnackbar.showError("Something Went Wrong","Close");
          console.error('Error fetching search results:', error);
          // Handle error here if needed
        }
      )
    }

  }

  private updatePageSlice(): void {
    this.pageSlice = this.suppliers.slice(0, 20);
    this.dataSource.data = this.pageSlice;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  locationSearch() {

    const formvalue = this.searchLocationFormControl.get('searchLocation').value;

  // Apply the filter to the entire suppliers list
    const filteredSuppliers = this.suppliers.filter((supplier: Supplier_list) =>
      supplier.Address.toLowerCase().includes(formvalue)
     );

     this.dataSource.data = filteredSuppliers;
     this.dataSource.filter = formvalue.trim().toLowerCase();

  
   
  }

  getPageIndex(): number {
    return this.paginator ? this.paginator.pageIndex : 0;
  }

  getPageSize(): number {
    return this.paginator ? this.paginator.pageSize : 10;
  }

  clearSearchLocation(){

  this.pageSlice = this.suppliers.slice(0, 20);
  // this.dataSource.data = this.pageSlice;
  // Clear the form control
  this.searchLocationFormControl.get('searchLocation').setValue('');

  // Optionally, reset pagination
  }



  onPageChange(event: PageEvent):void{
    
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.suppliers.length);
    this.pageSlice = this.suppliers.slice(startIndex, endIndex);
    this.dataSource.data = this.pageSlice;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.elementRef.nativeElement.remove();
  }

}
