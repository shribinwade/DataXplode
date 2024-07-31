import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charCodeToLetter'
})
export class CharCodeToLetterPipe implements PipeTransform {
  transform(value: string): string {
    const match = value.match(/^product(\d+)$/);
    if (match) {
      const index = parseInt(match[1], 25);
      return `product${String.fromCharCode(64 + index)}`;
    }
    return value;
  }
}