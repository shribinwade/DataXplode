import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bulletpoints',
  templateUrl: './bulletpoints.component.html',
  styleUrl: './bulletpoints.component.scss'
})
export class BulletpointsComponent {
   
  bulletPoint: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:{bullet:any},private ref: MatDialogRef<BulletpointsComponent>){
  
    this.bulletPoint = data.bullet;
    // this.bulletPoint=this.parseBulletString(data.bullet)
   
    
    
   
   
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
