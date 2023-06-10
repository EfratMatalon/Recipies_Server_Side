import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(str:string, strToReplace: string, replacement:string): any {
    if (!str || !strToReplace || !replacement) {
        return str;
    }
     return str.replace(new RegExp(strToReplace), replacement)
}

}
