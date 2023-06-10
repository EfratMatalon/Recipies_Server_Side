import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(items: any[], start: number, end: number): any {
    if (!items) {
      return items;
    }
    return items.slice(start, end);

  }
}