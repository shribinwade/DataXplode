import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../../markertsearch/shared-service/data-service.service';
import { LoadingService } from '../../../../Services/loading.service';
import { MiDataService } from '../../mi-service/mi-data.service';
import { fadeInOutAnimation } from '../../../../shared/animations';
import { StratergysearchService } from '../../../../Services/stratergysearch.service';
import { finalize, Subscription } from 'rxjs';
import { SnackbarService } from '../../../../Services/snackbar.service';

@Component({
  selector: 'app-porter-strategy',
  templateUrl: './porter-strategy.component.html',
  styleUrl: './porter-strategy.component.scss',
  animations: [fadeInOutAnimation]
})
export class PorterStrategyComponent implements OnInit {
 
 
  private subscription!: Subscription;

  pageHidden:boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    public loadingService:LoadingService,
    private sharedService:MiDataService,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private globalSnackbar: SnackbarService,
    private stratergyService:StratergysearchService
  ){}


  ngOnInit(): void {
    this.subscription = this.sharedService.handleSubmit.subscribe(() =>{
      this.stratergySubmit();
    }) 

  }


  stratergySubmit(){

    //Getting searchFormData using service
    const data=this.sharedService.getSearchData();

    console.log(data);
    

    if(data !== undefined){
      this.loadingService.setChildState(true);

      this.stratergyService.post_get_competitive_stratergy_details(data).pipe(
        finalize(() => {
          //Stoping Loading after complete response
          this.loadingService.setChildState(false);
        })
      ).subscribe(res =>{

         this.pageHidden =!this.pageHidden;
         //showing pop up after result
         const snackBarRef = this.globalSnackbar.showSuccess('Search Successful', 'View Result');
      
         // Check the structure of `res`
         console.log('API Response:', res);
        
      })
      

    }

  }

}
