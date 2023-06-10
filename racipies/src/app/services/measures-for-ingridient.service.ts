import { Injectable } from '@angular/core';
import { measureForIngredient } from '../classes/measuresForIngredient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasuresForIngridientService {
 url: string = "http://localhost:58285/api/measuresForIngredients";
ingredients: Array<measureForIngredient>|undefined;
constructor(public hc: HttpClient) {
  // this.GetAll().subscribe(
  //   (data: any) => { debugger; this.ingredients = data; },
  //   (err: Error) => { console.log(err); }
  // ) 
}


GetAll(): Observable<Array<measureForIngredient>> {
  return this.hc.get<Array<measureForIngredient>>(this.url);
}
  /**
   * פונקציה השולחת קוד רכיב ומקבלת רשימת מידות לרכיב זה 
   * @param id קוד הרכיב עבורו יש לקבל מדידות
   */
   GetPracticulr(id: number): Observable<Array<measureForIngredient>> {
    return this.hc.get<Array<measureForIngredient>>(`${this.url}/${id}`);
  }


  /**
   * פונקציה השולחת קוד רכיב ורשימת אמצעי מדידה לרכיב זה לשרת
   * , שיוסיף אותם לטבלת אמצעי מדידה לרכיב
   * @param id קוד רכיב עבורו יש להוסיף אמצעי מדידה
   * @param ingredients רשימת האמצעי מדידה להוסיף רכיב הנ"ל
   * מחזירה האם הצליחה להוסיף את המתכון
   */
  AddMeasuresForPraticularIngredient(
        id: number, measures: Array<measureForIngredient>): Observable<number> {
    debugger;
    return this.hc.put<number>(`${this.url}/${id}`, measures);
  }
}
