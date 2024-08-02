
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LoadingService } from '../../../../../../../../Services/loading.service';


export interface Review {
  reviewTitle: string;
  reviewDetail: string;
  rating: string;
  reviewed_by_name: string;
  reviewed_date: Date;
  verfied_purchase: boolean;
}


@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.scss']
})
export class ReviewlistComponent implements OnInit, AfterViewInit {
  
  ReviewData: Review[] = [];
  dataSource!: MatTableDataSource<Review>;

  displayedColumns: string[] = ['index','reviewTitle', 'reviewDetail', 'rating', 'reviewed_by_name', 'reviewed_date', 'verfied_purchase'];
  ratings: number[] = [4, 3, 2, 1];
  sortOrder: 'ascending' | 'descending' | 'date' = 'ascending'; // Track current sort order

  show_spinner: boolean = false;

  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    //getting data 
    @Inject(MAT_DIALOG_DATA) public data: { Amazon_review_info: any },
    private ref: MatDialogRef<ReviewlistComponent>, private cdRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    public  loadingService: LoadingService
  ) {
    // Access the nested Amazon_review_info array
    if (data && data.Amazon_review_info && Array.isArray(data.Amazon_review_info.Amazon_review_info)) {
      this.show_spinner = !this.show_spinner;
      this.ReviewData = data.Amazon_review_info.Amazon_review_info;
    }
      else {
      console.error("Expected an array for Amazon_review_info, but got:", typeof data.Amazon_review_info);
    }
    
    this.dataSource = new MatTableDataSource(this.ReviewData);
    console.log(this.ReviewData);
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

       // Example: Apply default sorting by reviewTitle ascending
       this.dataSource.sortingDataAccessor = (item, property) => {
        switch (this.sortOrder) {
          case 'ascending':
            return (item as any)[property];
          case 'descending':
            return -(item as any)[property];
          case 'date':
            if (property === 'reviewed_date') {
              return item.reviewed_date.getTime(); // Sort by date (assuming reviewed_date is Date type)
            }
            return (item as any)[property];
          default:
            return (item as any)[property];
        }
      };
  }


  ngOnInit(

    
  ): void {
  
  }



  applyFilter(event: MatSelectChange) {
    
    if (event !== undefined && event !== null) {
      const filterValue = parseFloat(event.value.toString().trim());
  
      // Apply the filter predicate
      this.dataSource.filterPredicate = (data: Review, filter: string) => {
        console.log('data.rating:', data.rating);
        console.log('filter:', filter);
        const rating = parseFloat(data.rating); 
        if(filterValue === 4.0 ){
          return  rating >= filterValue;
        }else{
          return rating === filterValue;
        }
        
      };
  
      // Set the filter
      this.dataSource.filter = filterValue.toString();
  
      // Log the filtered data
      console.log('Filtered data:', this.dataSource.filteredData);
      // this.cdRef.detectChanges();
    }
  }



  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  changeSortOrder(sortOrder: 'ascending' | 'descending' | 'date' | 'ratingHighToLow' | 'ratingLowToHigh') {
    debugger
    switch (sortOrder) {
      case 'ratingLowToHigh':
        this.sort.active = 'rating';
        this.sort.direction = 'asc';
        break;
      case 'ratingHighToLow':
        this.sort.active = 'rating';
        this.sort.direction = 'desc';
        break;
      case 'ascending':
        this.sort.active = 'rating';
        this.sort.direction = 'asc';
        break;
      case 'descending':
        this.sort.active = 'rating';
        this.sort.direction = 'desc';
        break;
      case 'date':
        this.sort.active = 'reviewed_date';
        this.sort.direction = 'asc'; // Change to 'desc' if you want descending order by date
        break;
      default:
        this.sort.active = '';
        this.sort.direction = '';
        break;
    }
    this.dataSource.sort = this.sort; // Reapply sorting with the new sortOrder
  
  }
  closepopup(): void {
    this.ref.close();
  }
}


