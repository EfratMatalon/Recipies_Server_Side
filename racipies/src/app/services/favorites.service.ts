import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { favorite } from '../classes/favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  url: string = "http://localhost:58285/api/favorites";

  favoritesListForUser:Array<favorite> |undefined;
  /**בנאי - לו מוזרק HttpClient , ובעת טעינת התוכנה - יטען את רשימת המתכונים מהשרת*/
  constructor(public hc: HttpClient) { }

     /**
     *  פונקציה השולחת את  המתכון לשרת שיוסיף אותו למסד
     * @param newRecord מתכון להוספה
     */
    Add(newRecord: favorite): Observable<number> {
      return this.hc.put<number>(this.url, newRecord);
    }
  
     /**
      * פונקציה שמוחקת מתכון מהמועדפים
      * @param IDfavorite id של המועדף למחיקה
      */
      delete(IDfavorite:number): Observable<ArrayBuffer> {
        return this.hc.delete<ArrayBuffer>(this.url + "/" + IDfavorite);
      }
  
      
  
    /**
     * פונקציה המקבלת את כל המתכונים של כותב  ספציפי- לא שימושית לנו
     * @param id קוד הכותב שאת המתכונים שלו רוצים לראות
     */
    GetAllOfPracticularUserById(id: number): Observable<Array<favorite>> {
      return this.hc.get<Array<favorite>>(`${this.url}/${id}`);
    }
}
