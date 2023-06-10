import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ingredient } from 'src/app/classes/ingredient';
import { IngredientForRecipy } from '../classes/IngredientsForRecipy';
import { ingredientToAdd } from '../classes/ingredientToAdd';

@Injectable({
  providedIn: 'root'
})
export class IngredientsForRecipyService {

  url: string = "http://localhost:58285/api/ingridientsForRecipies";

  constructor(public hc: HttpClient) { }
  
   /**
   * פונקציה השולחת קוד מתכון ומקבלת  רשימת רכיבים למתכון זה 
   * @param id קוד מתכון עבורו יש לקבל רכיבים
   */
  GetIngridientsOfPracticulrRecipy(id: number): Observable<Array<ingredient>> {
    return this.hc.get<Array<ingredient>>(`${this.url}/${id}`);
  }


  /**
   * פונקציה השולחת קוד מתכון ורשימת רכיבים למתכון זה לשרת
   * , שיוסיף אותם לטבלת רכיבים למתכון
   * @param id קוד מתכון עבורו יש להוסיף רכיבים
   * @param ingredients רשימת הרכיבים להוסיף למתכון הנ"ל
   * מחזירה האם הצליחה להוסיף את המתכון
   */
  AddIngredientsForPraticularRecipy(id: number, ingredients: Array<IngredientForRecipy>): Observable<number> {
    debugger
    return this.hc.put<number>(`${this.url}/${id}`, ingredients);
  }


   /**
   * פונקציה השולחת קוד מתכון ורשימת רכיבים למתכון זה לשרת
   * , שיוסיף אותם לטבלת רכיבים למתכון
   * @param id קוד מתכון עבורו יש להוסיף רכיבים
   * @param ingredients רשימת הרכיבים להוסיף למתכון הנ"ל
   * מחזירה האם הצליחה להוסיף את המתכון
   */
  updateIngredientsForPraticularRecipy(ingredient: ingredientToAdd): Observable<number> {
    debugger
    return this.hc.put<number>(`${this.url}/update`, ingredient);
  }

}
