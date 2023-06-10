import { Pipe, PipeTransform, Inject, LOCALE_ID, ɵRenderFlags } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'dateAndMore'

})

/**
 * @extends DatePipe
 */
export class DateAndMorePipe implements PipeTransform {

  

  readonly today = new Date();
  yesterday = new Date();
  datep: DatePipe | undefined;


  constructor(@Inject(LOCALE_ID) locale: string) {
    this.datep = new DatePipe(locale);
  }

  /**
   * 
   * @param value 
   * @param args 
   * @override DatePipe.transform()
   * 
   */
  transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null {
    debugger;
    if (value === null || value === undefined) {
      return null;
    }

    let dd = new Date(value);
    let d: string = dd.toLocaleDateString();
    this.yesterday.setDate(this.today.getDate() - 1);

    
   



    switch (d) {
      case this.today.toLocaleDateString():
        return "היום ב-" + this.datep!.transform(value, "hh:mm");
      case this.yesterday.toLocaleDateString():
        return "אתמול ב-" + this.datep!.transform(value, "hh:mm");
      default:
        return this.datep!.transform(value, "dd/MM/yyyy");

    }

  }


}
