import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, Inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../../../../../../../Services/loading.service';
import { SkuService } from '../../../../../../../Services/sku.service';
import { fadeInOutAnimation } from '../../../../../../../shared/animations';

export interface Review {
  reviewTitle: string;
  reviewDetail: string;
  rating: string;
  reviewed_by_name: string;
  reviewed_date: Date;
  verfied_purchase: boolean;
}

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ReviewDialogComponent implements AfterViewInit, OnInit {
  ReviewData: Review[] = [];
  dataSource = new MatTableDataSource<Review>(this.ReviewData);

  displayedColumns: string[] = ['index', 'reviewTitle', 'reviewDetail', 'rating', 'reviewed_by_name', 'reviewed_date', 'verfied_purchase'];
  ratings: number[] = [4, 3, 2, 1];
  sortOrder: 'ascending' | 'descending' | 'date' = 'ascending';
  show_spinner: boolean = false;
  data: any;
  asin: string;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public asinData: { asinData: string },
    private skuservice: SkuService,
    private ref: MatDialogRef<ReviewDialogComponent>, 
    private cdRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    public loadingService: LoadingService
  ) {
    this.asin = asinData.asinData;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (this.sortOrder) {
        case 'ascending':
          return (item as any)[property];
        case 'descending':
          return -(item as any)[property];
        case 'date':
          if (property === 'reviewed_date') {
            return item.reviewed_date.getTime();
          }
          return (item as any)[property];
        default:
          return (item as any)[property];
      }
    };
  }

  ngOnInit(): void {
    this.loadReviews(this.asin);
  }

  loadReviews(asinkey: string) {
    this.skuservice.Post_get_amazon_info_reviews(asinkey).subscribe(res => {
      this.data = res.Amazon_review_info;
    

      if (Array.isArray(this.data)) {
        this.show_spinner = !this.show_spinner;
        this.ReviewData = this.data;
        this.dataSource.data = this.ReviewData;
        this.cdRef.detectChanges(); // Manually trigger change detection
      } else {
        console.error("Expected an array for Amazon_review_info, but got:", typeof this.data.Amazon_review_info);
      }
    });
  }

  applyFilter(event: MatSelectChange) {
    if (event !== undefined && event !== null) {
      const filterValue = parseFloat(event.value.toString().trim());

      this.dataSource.filterPredicate = (data: Review, filter: string) => {
        const rating = parseFloat(data.rating);
        if (filterValue === 4.0) {
          return rating >= filterValue;
        } else {
          return rating === filterValue;
        }
      };

      this.dataSource.filter = filterValue.toString();
     
      this.cdRef.detectChanges(); // Manually trigger change detection
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  changeSortOrder(sortOrder: 'ascending' | 'descending' | 'date' | 'ratingHighToLow' | 'ratingLowToHigh') {
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
        this.sort.direction = 'asc';
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
