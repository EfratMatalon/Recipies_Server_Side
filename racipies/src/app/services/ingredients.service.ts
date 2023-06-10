import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ingredient } from 'src/app/classes/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService{

  url: string = "http://localhost:58285/api/ingredients";
  ingredients: Array<ingredient>|undefined;
  constructor(public hc: HttpClient) {
    
    this.GetAll().subscribe(
      (data: any) => { debugger; this.ingredients = data; },
      (err: Error) => { console.log(err); }
    ) }
      
  
  GetAll(): Observable<Array<ingredient>> {
    return this.hc.get<Array<ingredient>>(this.url);
  }
  
  /**
   * פונקציה המכניסה רכיב חדש לטבלת רכיבים בDB ומחזירה את הקוד שקיבל
   * @param newRecord הרכיב החדש להוספה
   */
  AddIngredient(newRecord: ingredient): Observable<number> {
    return this.hc.put<number>(this.url, newRecord);
  }
}
