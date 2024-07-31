import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bcg-matrix-chart',
  templateUrl: './bcg-matrix-chart.component.html',
  styleUrl: './bcg-matrix-chart.component.scss'
})
export class BcgMatrixChartComponent {

  bulletPoint: any;

  constructor(private ref: MatDialogRef<BcgMatrixChartComponent>){
    // console.log(data);
    // this.bulletPoint = data.bullet;
    // // this.bulletPoint=this.parseBulletString(data.bullet)
    // console.log(this.bulletPoint);
    
    
   
   
}
// parseBulletString(bulletString: string): any {
//   const bulletObject: any = {};
//   const lines = bulletString.split('\n');

//   lines.forEach(line => {
//     const [key, value] = line.split(': ', 2); // Split by ': ' to separate key and value
//     if (key && value) {
//       bulletObject[key.trim()] = value.trim(); // Trim whitespace and assign to object
//     }
//   });
    
//   return bulletObject;
// }

// getObjectKeys(obj: any): string[] {
//   return Object.keys(obj);
// }

  closepopup(){
    this.ref.close()
  }
}
