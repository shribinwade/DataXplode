import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-tool',
  templateUrl: './mi-tool.component.html',
  styleUrl: './mi-tool.component.scss'
})
export class MiToolComponent {
  selectedCountry!: any;

  eventHandler($event: any) {
    this.selectedCountry = $event;
  }
}
