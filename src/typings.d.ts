import * as jquery from 'jquery';

declare global {
  interface JQuery {
    owlCarousel(options?: any): JQuery;
    isotope(options?: any): JQuery;
  }
}
