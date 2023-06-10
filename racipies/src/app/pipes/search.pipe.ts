import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], obgToSearch: Object, filedToSearch?:string): any {
    if (!items || !obgToSearch) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    let filed = filedToSearch? filedToSearch: 'name';
    // השורה הבאה גורמת שיוצגו רק הפריטים ששמם מכיל (לא משנה איפה) את המחרוזת שחופשה
     return items.filter(item => item[filed].indexOf(obgToSearch) !== -1)
    //השורה הזו ממינת את הפריטים לפי מיקום המחרוזת בתוכם
    //כך שאלו ששמם מתחיל במחרוזת המבוקשת - יוצגו תחילה
    //ואלו שהיא מופיעה בסופם - יופיעו בתחתית הרשימה
    .sort((a:any,b:any)=>a[filed].indexOf(obgToSearch)<b[filed].indexOf(obgToSearch)?-1:1);
}

}
