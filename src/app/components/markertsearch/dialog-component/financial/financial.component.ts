import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss'
})
export class FinancialComponent {

  bulletPoint: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:{bullet:any},private ref: MatDialogRef<FinancialComponent>){
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
