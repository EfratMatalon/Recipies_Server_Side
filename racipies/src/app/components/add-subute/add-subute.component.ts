import { Component, OnInit } from '@angular/core';
import { ingredient } from 'src/app/classes/ingredient';
import { measure } from 'src/app/classes/measure';
import { IngredientsForRecipyService } from 'src/app/services/ingredients-for-recipy.service';
import { UsersService } from 'src/app/services/users.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MeasuresService } from 'src/app/services/measures.service';

@Component({
  selector: 'app-add-subute',
  templateUrl: './add-subute.component.html',
  styleUrls: ['./add-subute.component.css']
})
export class AddSubuteComponent implements OnInit {



  constructor(  public measuresSer: MeasuresService, //public iSer: IngredientsService, public iFrSer: IngredientsForRecipyService, public userSer: UsersService,
    public modalRef: MdbModalRef<AddSubuteComponent>) { 
      // טעינת רשימת אמצעי המדידה
      this.measuresSer.GetAll().subscribe(
        (data: any) => { debugger; this.measures = data; },
        (err: Error) => { console.log(err); }
      )
    }

  //#region  הרשימות הדרושות
  /**  אמצעי המדידה*/
  measures: Array<measure> | undefined;
  /** רשימה מצומצמת של הרכיבים - רק הרכיבים העונים על מגבלת בתחליף המתוסף כעת */
  ingredients: Array<ingredient> | undefined; //@Input() 

  //#endregion

  //#region  התחליף שנוסיף

  /**הרכיב הנוכחי , שכעת מתמלא ויתוסף למתכון */
  ingridient: ingredient | undefined;
  /**כלי מדידה שנבחר לרכיב התוסף כעת */
  measure: measure | undefined;
  /**כמות לרכיב המתוסף כעת */
  ingridientQ: number | undefined;
  /**הערה לרכיב המתוספת כעת */
  ingridientNote: string | undefined;

  //#endregion


  ngOnInit(): void {
    
  }



  /** כותרת המודאל */
  title: string | null = null;

  close(closeReason: string): void {
    this.modalRef.close({
      closeReason: closeReason, // סיבת הסגירה
      q: this.ingridientQ, //כמות התחליף
      m: this.measure, //אמצעי מדידה
      i: this.ingridient, //התחליף
      n: "" //הערה
    })
  }

}
