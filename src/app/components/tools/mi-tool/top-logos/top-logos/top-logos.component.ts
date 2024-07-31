import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-logos',
  templateUrl: './top-logos.component.html',
  styleUrl: './top-logos.component.scss'
})
export class TopLogosComponent {

  @Output() eventEmitter = new EventEmitter();

  selectedCountry!: string;

  logos = [
    { src: 'assets/indiaflag.png', label: 'India' },
    { src: '/assets/logo.png', label: 'France' },
    { src: '/assets/logo.png', label: 'Germany' },
    { src: '/assets/logo.png', label: 'Spain' },
    { src: '/assets/logo.png', label: 'UNITED KINGDOM' },
    { src: '/assets/logo.png', label: 'Europe' },
    { src: '/assets/logo.png', label: 'Denmark' },
    { src: '/assets/logo.png', label: 'USA' },
    { src: '/assets/logo.png', label: 'Japan' },
    { src: '/assets/logo.png', label: 'australia' },
    { src: '/assets/logo.png', label: 'singapore' },
    // Add more logos as needed
  ];

  onCarouselItemClick(country: string) {
    console.log(country);
    
   this.eventEmitter.emit(country); 
  }
}
