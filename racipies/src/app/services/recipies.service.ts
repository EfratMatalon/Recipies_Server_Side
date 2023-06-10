import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { recipy } from 'src/app/classes/recipy';

@Injectable({
  providedIn: 'root'
})
/**
 * שירותי שרת עבור המתכונים - הוספה, שליפה, מחיקה וכו
 */
export class RecipiesService {
  url: string = "http://localhost:58285/api/recipies";
  public recipiesList: Array<recipy> = [];

  /**בנאי - לו מוזרק HttpClient , ובעת טעינת התוכנה - יטען את רשימת המתכונים מהשרת*/
  constructor(public hc: HttpClient) {
    this. GetAll().subscribe(
      (data: any) => { 
        this.recipiesList = data;
        debugger;
      console.table(this.recipiesList.values);
   
      },
      (err: Error) => {
        console.log(err);
      });
      debugger;
      console.log("--" + this.recipiesList.values.toString() + "--" );
  }


  GetAll(): Observable<Array<recipy>> {
    return this.hc.get<Array<recipy>>(this.url);
  }

  /**
   * פונקציה המחזירה את המתכון בעל קוד  ספציפי
   * @param id קוד  המתכון שאותו רוצים לראות
   * @return מ
   * 
   * 
   * */   
  GetById(id: number): Observable<recipy> {
    return this.hc.get<recipy>(`${this.url}/${id}`);
  }

    /**
   * פונקציה המחזירה את  המתכון בעל קוד  ספציפי
   * @param id קוד  המתכון שאותו רוצים לראות
   * @param name שם  המתכון שאותו רוצים לראות
   */
  GetByName(name: string, id?: number): Observable<recipy> {
    return this.hc.get<recipy>(`${this.url}/${name}/${id}`);
  }

    /**
     *  פונקציה השולחת את  המתכון לשרת שיוסיף אותו למסד
     * @param newRecord מתכון להוספה
     */
  AddRecipy(newRecord: recipy): Observable<number> {
    return this.hc.put<number>(this.url, newRecord);
  }

   /**
     *  פונקציה השולחת את  המתכון לשרת שיוסיף אותו למסד
     * @param newRecord מתכון להוספה
     */
    deleteRecipy(IDrecipy:number): Observable<ArrayBuffer> {
      return this.hc.delete<ArrayBuffer>(this.url + "/" + IDrecipy);
    }

    

  /**
   * פונקציה המקבלת את כל המתכונים של כותב  ספציפי- לא שימושית לנו
   * @param id קוד הכותב שאת המתכונים שלו רוצים לראות
   */
  GetAllOfPracticularUserById(id: number): Observable<Array<recipy>> {
    return this.hc.get<Array<recipy>>(`${this.url}/allOfUserById/${id}`);
  }

  /**
   * פונקציה המקבלת את כל המתכונים של כותב ספציפי - לא שימושית לנו
   * @param name שם הכותב שאת המתכונים שלו רוצים לראות
   */
  GetAllOfPracticularUser(name: string): Observable<Array<recipy>> {
    return this.hc.get<Array<recipy>>(`${this.url}/allOfUser/${name}`);
  }


   /** פונקציה המעלה קובץ לשרת, במקרה שלנו - תמונה */
   uploadImage(image:any, prevImg:string) {
     debugger;
    const formData: FormData = new FormData();
    formData.append('Image', image, image.name);
    prevImg = prevImg.trim() == ""?
              "a/a":
              prevImg.replace(".","/");
    return this.hc.post(`${this.url}/UploadImage/${prevImg}`, formData);
}
    deleteImage(prevImg:string){
      return this.hc.delete(`${this.url}/deleteImage/${prevImg}`);
    }


}
