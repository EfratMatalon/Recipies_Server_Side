import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filed:string, filter: any): any {
    debugger;
    if (!items || !filter || !filed) {
        return items; 
    }
    
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item[filed] == filter);
      
}

}
