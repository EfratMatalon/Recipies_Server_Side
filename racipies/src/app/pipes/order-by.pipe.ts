import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(items: any[], filedToSortBy: string, desc?:boolean, isnumeric?:boolean): any {
    debugger;
    if (!items || !filedToSortBy) {
        return items;
    }   

    var a = items
    // מיון על פי השדה שהתקבל
    .sort((a:any,b:any)=> 
    isnumeric? 
    this.comp(a[filedToSortBy],b[filedToSortBy]):
     (a[filedToSortBy].toString().localeCompare(b[filedToSortBy].toString())));
    return desc? a.reverse() : a;
}


//TODO למה לא עובד על "לייקים" ולבדוק אם עובד על מספרים
comp(a:any, b:any):number {
  return a>b? 1 : -1;
} 

}
