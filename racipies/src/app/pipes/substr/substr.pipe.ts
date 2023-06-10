import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substr'
})
export class SubstrPipe implements PipeTransform {

  transform(str:string, from:number, len:number, addIfBigger:string): any {
    if (!str) {
        return str;
    }
     return str.substr(0,len) + (str.length - from > len? addIfBigger: "");
}

}
