import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { recipy } from 'src/app/classes/recipy';
import { response } from '../classes/response';


@Injectable({
  providedIn: 'root'
})
export class ResponssesService {

  url: string = "http://localhost:58285/api/responses";
  // public recipiesList: Array<recipy> = [];

  /**בנאי - לו מוזרק HttpClient , ובעת טעינת התוכנה - יטען את רשימת המתכונים מהשרת*/
  constructor(public hc: HttpClient) { }


  
  /**
   * פונקציה המקבלת את כל התגובו המאושרו למתכון ספציפי
   * @param id קוד המתכון שאת התגובות שלו רוצים לראות
   */
  GetAllOfPracticularRecipyById(id: number): Observable<Array<response>> {
    return this.hc.get<Array<response>>(`${this.url}/${id}`);
  }

   /**
   * פונקציה המקבלת את כל התגובו המאושרו למתכון ספציפי
   * @param id קוד המתכון שאת התגובות שלו רוצים לראות
   */
  GetAllNotApprovedResponse(): Observable<Array<response>> {
    return this.hc.get<Array<response>>(`${this.url}/notApproved`);
  }

  AddResponse(newRecord: response): Observable<number> {
    return this.hc.put<number>(this.url, newRecord);
  }

  /**
   * פונקציה שעבור כל אחת מהתגובות שהקוד שלה מופיע ברשימה
   * מעדכנת את השדה "מאושר" למאושר
   * @param approved רשימת קודי התגובות שרוצים לאשר
   */
  approveResponses(approved:Array<number>): Observable<number> {
    return this.hc.put<number>(`${this.url}/update`, approved);
  }

  deleteResponse(id:number):Observable<ArrayBuffer> {
    return this.hc.delete<ArrayBuffer>(`${this.url}/${id}`);
  }

}
