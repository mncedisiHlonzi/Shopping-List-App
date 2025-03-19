import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zarCurrency',
})
export class ZarCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return 'R0.00'; // Default value if the input is not a number
    }
    // Format the value as South African Rand (ZAR) with the "R" symbol
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(value);
  }
}