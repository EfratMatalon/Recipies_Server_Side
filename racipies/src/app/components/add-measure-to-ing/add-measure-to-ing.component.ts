import { Component, OnInit } from '@angular/core';
import { MeasuresService } from 'src/app/services/measures.service';
import { measure } from 'src/app/classes/measure';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MeasuresForIngridientService } from 'src/app/services/measures-for-ingridient.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { measureForIngredient } from 'src/app/classes/measuresForIngredient';





@Component({
  selector: 'app-add-measure-to-ing',
  templateUrl: './add-measure-to-ing.component.html',
  styleUrls: ['./add-measure-to-ing.component.css']
})
export class AddMeasureToIngComponent implements OnInit {

  /** האם רכיב זה נמדד בגרמים (כמו קמח לדוגמא) או בממילליטרים (לדוג' חלב) */
  isGrams: boolean = true;

  newIngName: string = "שם הרכיב";
  /** מספר אמצעי המדידה (ללא הקבועים) */
  filteredLength: number = 0;

  constructor(
    public measureSer: MeasuresService,
    public mForIngSer: MeasuresForIngridientService,
    public modalRef: MdbModalRef<AddMeasureToIngComponent>) {
    this.MyMeasures();
  }



  measureForNewIng: Array<measureForIngredient> = [];
  newIngID: number = 1;

  close(closeReason: string): void {
    //בדיקות תקינות שונות
  debugger;
    //הכמויות לאמצעי שעדכן המשתמש בטופס
    
    if(this.isGrams){

      this.divid!.forEach(list => { 
        list.forEach(mea => {
          // אמצעי המדידה שיתוספו
          debugger;
          if(!this.isNullOrUndefined(this.getControls()["m"+mea.measureID]!.value))
          this.measureForNewIng.push(
            {
              measureID: mea.measureID,
              ingredientID: this.newIngID,
              grams: this.getControls()["m"+mea.measureID]!.value
            })
        })
      });
  
      //הוספת הנתונים עבור גרם וקילו - קבועים
     this.measureForNewIng.push(
        {//גרם
          measureID: 5,
          ingredientID: this.newIngID,
          grams: 1
        },
        {//קילו
          measureID: 6,
          ingredientID: this.newIngID,
          grams: 1000
        })
    }
    else{
    this.divid!.forEach(list => { 
      list.forEach(mea => {
        // אמצעי המדידה שיתוספו
        if(!this.isNullOrUndefined(this.getControls()["m"+mea.measureID]!.value))
        this.measureForNewIng.push(
          {
            measureID: mea.measureID,
            ingredientID: this.newIngID,
            mililiters: this.getControls()["m"+mea.measureID]!.value
          })
      })
    });

    //הוספת הנתונים עבור מיליליטר וליטר - קבועים
    this.measureForNewIng.push(
      {
        measureID: 7,
        ingredientID: this.newIngID,
        grams: 1
      },
      {
        measureID: 8,
        ingredientID: this.newIngID,
        grams: 1000
      }
      ) ;
    }
    



    // הוספת הרכיב לDB
    this.mForIngSer.AddMeasuresForPraticularIngredient(this.newIngID, this.measureForNewIng)
      .subscribe(

        (data: any) => {
          if (data > 0) {
            // this.newIng!.ingridientID = data;
            console.log("======== " + this.measureForNewIng!.length);

            //העברת קוד הרכיב לקומפוננטה הקוראת 
            //- ע"מ שתעביר לקומוננטת הוספת אמצעי מדידה לרכיב
            this.modalRef.close({
              closeReason: closeReason, // סיבת הסגירה
              measureForNewIng: this.measureForNewIng
            })
          }
          else {
            alert("המערכת נתקלה בבעיה, נא נסה שנית");
          }
        },
        (err: Error) => {
          alert("המערכת נתקלה בבעיה, נא נסה שנית");


        })

  }




  ngOnInit(): void {
  }


  myForm: FormGroup = new FormGroup({});

  MyMeasures() {//}:Array<Array<measure>>{

    //סינון הרכיבים שכמותם קבועה מהרשימה שתוצג למשתמש
    let filterd = this.measureSer.measures!.filter(m =>
      m.measureID != 5 && //גרם
      m.measureID != 7 &&//קילו
      m.measureID != 6 &&//ליטר
      m.measureID != 8);//מיליליטר

    this.filteredLength = filterd!.length;
    //יצירת FormControl עבור כל אמצעי מדידה
    filterd.forEach(element => {
      this.myForm.addControl('m' + element.measureID, new FormControl(null, [Validators.min(0)]))
    });
    //חלוקת האמצעים לשתי רשימות שוות בגודלן בערך - על מנת למנוע גלילה ארוכה של התצוגה
    this.divid = [filterd!.slice(0, filterd!.length / 2), filterd!.slice(filterd!.length / 2)];

    //החזרת הרשימות לHTML שיעבור עליהן
    // let divid:Array<Array<measure>>  return divid;
  }

  /** מערך של שתי רשימות אמצעי המדידה, באורך שווה */
  divid: Array<Array<measure>> | undefined;


  getControls() {
    return this.myForm.controls;
  }

  save() {
    alert("WE DID IT!!!!!!!!!!!!!!!!!!")
  }










   isNullOrUndefined(obg:any):boolean{
    return obg == null || obg == undefined;
  }
}


