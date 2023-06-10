import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showOnly'
})
export class ShowOnlyPipe implements PipeTransform {

  transform(items: any[], filed: string, filter: any, show: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item[filed] == filter)![0]![show];

  }

}
