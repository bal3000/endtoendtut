import { Pipe, PipeTransform } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, chars: number): string {
    let text = value;
    if (text.length > chars) {
      text = `${value.substring(0, chars)} ...`;
    }
    return text;
  }

}
