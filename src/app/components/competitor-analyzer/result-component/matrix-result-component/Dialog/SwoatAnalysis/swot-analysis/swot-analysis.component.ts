import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwotanalysisService } from '../../../../../../../Services/swotanalysis.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '../../../../../../../Services/snackbar.service';

// Define the structure of the data (this should match your actual data structure)


@Component({
  selector: 'app-swot-analysis',
  templateUrl: './swot-analysis.component.html',
  styleUrl: './swot-analysis.component.scss'
})
export class SwotAnalysisComponent implements OnInit {
  
   
 
  categories = ['Strength', 'Weakness', 'Opportunity', 'Threat'];
  displayedColumns: string[] = ['Product', 'Strength', 'Weakness', 'Opportunity', 'Threat'];
  dataSource: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public swotData: any, // Ensure the injected data matches the expected structure
    private swotAnalysisService: SwotanalysisService,
    private globalSnackbar: SnackbarService
  ) {}

  ngOnInit(): void {
  
    
    this.swotAnalysisService.Post_get_swot_analyzer(this.swotData).pipe(
      finalize(() => {
        // Any finalization code here
      })
    ).subscribe(
      res => {
    
        this.transformData(res); // Transform data for table display
      }, 
      error => {
        console.error('Error fetching SWOT analysis:', error);
        const snackBarRef = this.globalSnackbar.showError('Something went wrong', 'Close');
      }
    );
  }

  private transformData(data: any): void {
    this.dataSource = data.map((item: any) => {
      const productName = Object.keys(item)[0];
      const swotDetails = item[productName];

      return {
        Product: productName,
        Strength: swotDetails.strength ? swotDetails.strength.join(', ') : 'N/A',
        Weakness: swotDetails.weakness ? swotDetails.weakness.join(', ') : 'N/A',
        Opportunity: swotDetails.opportunity ? swotDetails.opportunity.join(', ') : 'N/A',
        Threat: swotDetails.threat ? swotDetails.threat.join(', ') : 'N/A'
      };
    });
  }
  

 

}
