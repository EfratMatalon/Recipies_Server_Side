import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientForRecipy } from 'src/app/classes/IngredientsForRecipy';
import { measure } from 'src/app/classes/measure';
import { measureForIngredient } from 'src/app/classes/measuresForIngredient';
import { recipy } from 'src/app/classes/recipy';
import { IngredientsForRecipyService } from 'src/app/services/ingredients-for-recipy.service';
import { MeasuresForIngridientService } from 'src/app/services/measures-for-ingridient.service';
import { MeasuresService } from 'src/app/services/measures.service';
import { RecipiesService } from 'src/app/services/recipies.service';
import { __await } from 'tslib';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { ResponsesComponent } from '../responses/responses.component';

@Component({
  selector: 'app-full-recipy',
  templateUrl: './full-recipy.component.html',
  styleUrls: ['./full-recipy.component.css']
})
export class FullRecipyComponent implements OnInit {

  /**המתכון המוצג */
  currentRecipy: recipy = {};
  /**
   * רשימת הרכיבים המקורית -  אותה לא נשנה כלל - אפשר אפילו ליצור אותה רק בסרוויס
   */
  orginalIngredients: Array<IngredientForRecipy> | undefined; // הרשימה המקורית - עליה לא נבצע שינוים
  /**
   * רשימה אותה נשנה בעת המרה לתחליפים ו/או אמצעי מדידה אחר
   * למעשה, ברב השדות שלה לא נשתמש, רק בפרטי רכב רגיל והודעה מהמתכנת
   */
  ingredients: Array<IngredientForRecipy> | undefined;
  /** רשימת אמצעי המדידה  האפשריים - בעיקרון אמורה לשבת בסרוייס*/
  measures: Array<measure> | undefined = [];
  /** אמצעי המדידה שנבחר להמיר אליו את כל הכלים*/
  measure: measure = { measureID: -1, measureName: "אמצעי המדידה המקוריים" };
  /**עבור כל רכיב - כמות הגרמים שנכנסים ממנו בכלי כלשהו */
  measuresForIngredientsList: Array<measureForIngredient> | undefined = [];

  constructor(public myactiveRoute: ActivatedRoute,
    public recipySer: RecipiesService,
    public ingSer: IngredientsService,
    public ingredientsSer: IngredientsForRecipyService,
    public mForISer: MeasuresForIngridientService,
    public measuresSer: MeasuresService) {

    debugger


    // טעינת אמצעי המדידה אליהם ניתן להחליף
    this.measuresSer.GetAll().subscribe(
      (data: any) => {
        this.measures = data;
      },
      (err: Error) => { console.log(err); }
    );
  }


  ngOnInit(): void {
    window.scrollTo({behavior:"smooth",top:0});
    debugger
    // קבלת קוד מתכון נוכחי מהנתיב
    this.myactiveRoute.params.subscribe((data: any) => {

      /** קוד מתכון נוכחי  */
     /**/ let id = data['recipyID'];

      // טעינת המתכון הנוכחי
      this.recipySer.GetById(id).subscribe(
        (data: any) => {
          this.currentRecipy = data;
          this.currenNumOfportions = data!.numOfportions;
          document.getElementById("kosher")!.style.backgroundColor = (data!.isMeaty? "brown" : (data!.isDairy? "cadetblue" :"chartreuse" ))
        },
        (err: Error) => { console.log(err); }
      );

      // טעינת רכיבי המתכון הנוכחי
      this.ingredientsSer.GetIngridientsOfPracticulrRecipy(id).subscribe(
        (data: any) => {
          console.table(data);
          this.orginalIngredients = data;
          this.ingredients = data;

          window.scrollTo({behavior:"auto",top:0});
        },
        (err: Error) => { console.log(err); }
      );

    },
      (err: any) => {
        console.log(err);
      });


    //מיון התגובות - מהמוקדמת למאוחרת
  }

  




  //#region =========== פונקציות שינוי מס מנות ===============

  // אולי כדאי גם לדאוג שתהיה אפשרות לחצאי מנות ורבעים

  /**הכמות עבור מנה אחת - סתם בשביל סדר ובהירות קוד */
  amountForOnePorition(porNum: number, quantity: number) {
    return quantity / porNum;
  }

  /**
   * פונקציה שמגדילה את כמות המנות, ומשנה את כמויות הרכיבים בהתאם
   * צריך לחשוב אם להחזיר את מידות או/ו סוג הרכיבים למקורי, ולהוריד הערות מתכנת
   */
  increasePoritonsAmount() {
    /**הכמות המקורית - אולי עדיף לקבל מהסרוויס של המתכונים, או לשמור מתכון מקורי */
    let oldPorNum: number = this.currentRecipy!.numOfportions!;
    /** -מיותר העיקרון  - אבל אין לי כח לחשוב - הכמות החדשה - המוגדלת  */
    let porNum: number = ++this.currentRecipy!.numOfportions!; //מעדכן גם את המתכון הנוכחי
    /**רכיב המתכון עליו אנו עובדות באיטרציה זו */
    let temp: IngredientForRecipy | undefined;

    for (let i = 0; i < this.ingredients!.length; i++) {//עבור כל רכיב
      temp = this.ingredients![i];
      temp!.quantity! += __await(this.amountForOnePorition(oldPorNum, temp!.quantity!));
      if (temp!.quantity! > 1)
        temp!.measure = "רבים"; //צריך לקבל את צורת הרבים - עדיף להוסיף בהמרות = בלגן או לחפש עכשיו ברשימת כלים - יקר
    }
  }

  decreasePoritonsAmount() {
    /**הכמות המקורית - אולי עדיף לקבל מהסרוויס של המתכונים, או לשמור מתכון מקורי */
    let oldPorNum: number = this.currentRecipy!.numOfportions!;
    if (oldPorNum <= 0)
      return; //בעיקרון צריך לחסום את כפתור ההפחתה עצמו במקרה כזה
    /** -מיותר העיקרון  - אבל אין לי כח לחשוב - הכמות החדשה - המוקטנת  */
    let porNum: number = --this.currentRecipy!.numOfportions!; //מעדכן גם את המתכון הנוכחי
    /**רכיב המתכון עליו אנו עובדות באיטרציה זו */
    let temp: IngredientForRecipy | undefined;

    for (let i = 0; i < this.ingredients!.length; i++) {//עבור כל רכיב
      temp = this.ingredients![i];
      temp!.quantity! -= __await(this.amountForOnePorition(oldPorNum, temp!.quantity!));
      if (temp!.quantity! <= 1)
        temp!.measure = "יחיד"; //צריך לקבל את צורת הרבים - עדיף להוסיף בהמרות = בלגן או לחפש עכשיו ברשימת כלים - יקר
    }
  }

  //#endregion

  //#region   =========== פונקציות תחלופות לרכיבים ===============
  // פונקציית המרה לבריא יותר
  onMakeItHealthy() {
    if (!this.currentRecipy!.makeItHealthy) {
      return;
    }
    for (let i = 0; i < this.orginalIngredients!.length; i++) {
      if (this.orginalIngredients![i].healthyIngridient != null) {
        this.ingredients![i].ingredientName = this.orginalIngredients![i].healthyIngridient;
        this.ingredients![i].quantity = this.orginalIngredients![i].healthyQuantity;
        this.ingredients![i].measure = this.orginalIngredients![i].healthyMeashure;
      }
    }
  }

  // פונקציית המרה ללא גלוטן
  onMakeItGlutenFree() {
    if (!this.currentRecipy!.makeItHealthy) {
      return;
    }
    for (let i = 0; i < this.orginalIngredients!.length; i++) {
      if (this.orginalIngredients![i].healthyIngridient != null) {
        this.ingredients![i].ingredientName = this.orginalIngredients![i].glutenFreeIngridient;
        this.ingredients![i].quantity = this.orginalIngredients![i].glutenFreeQuantity;
        this.ingredients![i].measure = this.orginalIngredients![i].glutenFreeMeashure;
        this.ingredients![i].programerNote = "";
      }
    }
  }
  //#endregion


  //#region ============= הדרך הסופית שבה כנראה נשתמש פונקציות המרת אמצעי מדידה -  ==============

  /**  אינדקס הרכיב - לחסוך חיפושים*/
  ingIndexForMesures: number = 0;

  /**
   * 
   * @param id קוד הרכיב - שאת האמצעים בהם אפשר למדוד אותו נרצה לקבל
   */GetMeasuresOfIng(id: number, meashureID: number) {

    debugger;
    // קבלת מיקום הרכיב ברשימת הרכיבים
    this.ingIndexForMesures = this.ingSer.ingredients!
      .findIndex(i => i.ingridientID === id);

    // אם רשימת אמצעי המדידה האפשריים ברכיב זה מלאה - כבר נטענה באיזשהוא שלב 
    if (this.ingSer.ingredients![this.ingIndexForMesures!]
      .measuresForIngredientList !== undefined) {
      if (this.ingSer.ingredients![this.ingIndexForMesures!]
        .measuresForIngredientList!.findIndex(m => m.measureID === meashureID) < 0)
        this.ingSer.ingredients![this.ingIndexForMesures!]
          .measuresForIngredientList = undefined;

    }

    else {
      // אחרת נטען אותה מהשרת
      this.mForISer.GetPracticulr(id).subscribe(
        (data: any) => {
          console.table(data);
          //אם לא ידועה כמות הגרמים /מ"ל של רכיב זה שמכיל אמצעי המדידה הנוכחי
          if (data!.findIndex((m: measureForIngredient) => m.measureID === meashureID) < 0)
            return;//אל תציג את האמצעים הידועים
          else //טען את רשימת אמצעי המדידה
            this.ingSer.ingredients![this.ingIndexForMesures!]
              .measuresForIngredientList = data;

          console.log("====== טענו רשימת אמצעים לרכיב זה");

        },

        (err: Error) => {
          console.log("============== יש בעיה ============" + err);

        }
      );
    }
  }



  changeMeasure(quantity: number, prev: number, meashureID: number,
    isGram: boolean, newM: measureForIngredient, ingId: number) {
    let temp;

    temp = this.getObgQuantity(quantity, prev, meashureID, isGram);

    /** תכלס כמה צריך במשקל של גרמים או מילילטר */
    let obgQuantity = temp.obgQ;

    isGram = temp.isGram;

    temp = this.ingredients!.find(i => i.id == ingId);

    // אם נמדד בגרמים
    if (isGram) {
      // הכמות הקודמת מתקבלת מגרמים
      temp!.measureGorL = newM.grams!
      // ויש להמשיך למדוד בגרמים
      temp!.g = true;
    }
    else {
      // הכמות הקודמת מתקבלת מגרמים
      temp!.measureGorL = newM.mililiters!
      // ויש להמשיך למדוד בגרמים
      temp!.g = false;
    }

    // ההמרה עצמה 
    temp!.quantity = obgQuantity / temp!.measureGorL!;
    // שאר הפרטים
    temp!.meashureID = newM.measureID;
    temp!.measure = newM.measureName;
    temp!.measurePlural = newM.measurePlural;

  }

  /**  פונקציה המשנה את כלי המדידה של תחליף בריא ברכיב המבוקש
   * @param quantity 
   * @param prev 
   * @param meashureID 
   * @param isGram 
   * @param newM 
   * @param ingId 
   */
  changeMeasureHealthy(quantity: number, prev: number, meashureID: number,
    isGram: boolean, newM: measureForIngredient, ingId: number) {

    let data = this.getObgQuantity(quantity, prev, meashureID, isGram);


    let temp = this.ingredients!.find(i => i.id == ingId);

    // אם נמדד בגרמים
    if (data.isGram) {
      // הכמות הקודמת מתקבלת מגרמים
      temp!.healthyMeasureGorL = newM.grams!
      // ויש להמשיך למדוד בגרמים
      temp!.healthyG = true;
    }
    else {
      // הכמות הקודמת מתקבלת מגרמים
      temp!.healthyMeasureGorL = newM.mililiters!
      // ויש להמשיך למדוד בגרמים
      temp!.healthyG = false;
    }

    // ההמרה עצמה 
    temp!.healthyQuantity = data.obgQ / temp!.healthyMeasureGorL!;
    // שאר הפרטים
    temp!.healthyMeashureID = newM.measureID;
    temp!.healthyMeashure = newM.measureName;
    temp!.healthyMeashurePlural = newM.measurePlural;

  }


  changeMeasureNutFree(quantity: number, prev: number, meashureID: number,
    isGram: boolean, newM: measureForIngredient, ingId: number) {
    let temp;

    temp = this.getObgQuantity(quantity, prev, meashureID, isGram);

    /** תכלס כמה צריך במשקל של גרמים או מילילטר */
    let obgQuantity = temp.obgQ;

    isGram = temp.isGram;

    temp = this.ingredients!.find(i => i.id == ingId);

    // אם נמדד בגרמים
    if (isGram) {
      // הכמות הקודמת מתקבלת מגרמים
      temp!.nutFreeMeasureGorL = newM.grams!
      // ויש להמשיך למדוד בגרמים
      temp!.nutFreeG = true;
    }
    else {
      // הכמות הקודמת מתקבלת מגרמים
      temp!.nutFreeMeasureGorL = newM.mililiters!
      // ויש להמשיך למדוד בגרמים
      temp!.nutFreeG = false;
    }

    // ההמרה עצמה 
    temp!.nutFreeQuantity = obgQuantity / temp!.measureGorL!;
    // שאר הפרטים
    temp!.nutFreeMeashureID = newM.measureID;
    temp!.nutFreeMeashure = newM.measureName;
    temp!.nutFreeMeashurePlural = newM.measurePlural;
  }

  /** פונקציה המחזירה אובייקט המכיל את הכמות
   *  שצריך מהרכיב בגרמים או במילליטרים 
   * והאם נמדד בגרמים  - אם כן true ואם מילליטרים false
   * @param quantity כמות נוכחית לאמצעי מדיה נוכחי
   * @param prev טענו שכבר כמות אובייקטיבית
   * @param meashureID אמצעי המדידה הנוכחי 
   * @param isGram האם נמדד בגרמים
   */
  getObgQuantity(quantity: number, prev: number, meashureID: number,
    isGram: boolean) {
    debugger;
    if (prev == null) { // אם עדיין לא טענו כמות אובייקטיבית - בגרמים או מ"ל

      //נמצא את אמצעי המדידה הספציפי שבו הרכיב משתמש כעת
      let temp = this.ingSer.ingredients![this.ingIndexForMesures!]
        .measuresForIngredientList!.find(m => m.measureID == meashureID);

      // אם נמדד בגרמים
      if (!this.isNullOrUndefined(temp!.grams)) {
        // הכמות הקודמת מתקבלת מגרמים
        prev = temp!.grams!;
        // ויש להמשיך למדוד בגרמים
        isGram = true;
      }
      else {
        // הכמות הקודמת מתקבלת ממ"ל
        prev = temp!.mililiters!;
        // ויש להמשיך למדוד במ"ל
        isGram = false;
      }
    }

    /** תכלס כמה צריך במשקל של גרמים או מילילטר */
    return { obgQ: quantity * prev, isGram: isGram };


  }



  //#endregion



  //#region  ========== פונקציות המרת אמצעי מדידה ======================
  /**
   *  פונקציית המרת הרכיב שנשלח לגרמים מכל אמצעי מידה אחר 
   * @param i אינדקס  הרכיב להמרה ברשימת הרכיבים 
   */
  convertIngMeasureToGrams(i: number) {
    //כרגע נקבע שרירותית את האינדקס של 'גרם' אבל אחרי זה נקבל ונקבע אותו בסרוויס
    let temp: IngredientForRecipy = this.ingredients![i] //הצבעה לרכיב
    //לחסוך המרות לחינם -  אם זה  כבר גרם או כבר האמצעי המבוקש - אין טעם להמיר     
    if (temp.measure != "גרם" && temp.meashureID != this.measure!.measureID) {
      /**הנתונים על כמות הגרמים שנכנסת באמצעי המידה המבוקש מהרכיב שנשלח
       * אם יש כאלה נתונים
        */
      let mForI: measureForIngredient | undefined = this.measuresForIngredientsList!.
        find((m: measureForIngredient) =>
          m.ingredientID == temp!.ingridientID
          && m.measureID == this.measures![4].measureID //האידי של גרם בSQL הוא 5 לכן האינדקס 4
        );
      if (mForI == undefined) {
        //להודיע  למשתמש שאת השורה הזו אי אפשר להמיר
        this.ingredients![i]!.programerNote =
          "כרגע אין אפשרות להמיר את כמות רכיב זה ל" + this.measures![4].measureName;
        return false;
      }
      else {
        //המרת כמות מהרכיב לגרמים
        this.ingredients![i]!.quantity! *= mForI!.grams!
        // פחות הכרחי - שינוי גם של שם וקוד אמצעי המדידה לגרמים
        this.ingredients![i].meashureID == this.measures![4].measureID;
        this.ingredients![i].measure == this.measures![4].measureName;
        this.ingredients![i]!.programerNote = ""; //לא צריך שום הודעה

      }//לבדוק אם אפשר להציב לתוך לט ת כלומר להחליף את this.ingredients![i].measure  לTEMP

    }
    return true;
  }

  /**
 *  פונקציית המרת הרכיב שנשלח לגרמים/למיליליטרים - מה שמתאים לרכיב מכל אמצעי מידה אחר 
 * @param i אינדקס  הרכיב להמרה ברשימת הרכיבים 
 */
  convertIngMeasureToGrams0rML(i: number) {
    //כרגע נקבע שרירותית את האינדקס של 'מיליליטר' אבל אחרי זה נקבל ונקבע אותו בסרוויס
    let temp: IngredientForRecipy = this.ingredients![i] //הצבעה לרכיב

    //לחסוך המרות לחינם -  אם זה  כבר גרם או מיליליטר או כבר האמצעי המבוקש - אין טעם להמיר     

    if (temp.meashureID == 5 || temp.meashureID == 7 //כאשר הקוד של גרם במסד הוא 5 ושל מ"ל הוא 7
      || temp.meashureID == this.measure!.measureID)
      return true; //הרכיב "הומר"

    /**הנתונים על כמות הגרמים שנכנסת באמצעי המידה המבוקש מהרכיב שנשלח
    * אם יש כאלה נתונים
     */
    let mForI: measureForIngredient | undefined = this.measuresForIngredientsList!.
      find((m: measureForIngredient) =>
        m.ingredientID == temp!.ingridientID &&
        m.measureID == temp!.meashureID //אולי בכלל נמיר את זה בהמרה לאנטיטיס ולא נצטרך את כל החיפוש 
      );

    if (mForI == undefined) { //אם אין עבור רכיב זה פרטים על האמצעי המבוקש

      //להודיע  למשתמש שאת השורה הזו אי אפשר להמיר
      this.ingredients![i]!.programerNote =
        "כרגע אין אפשרות למדוד כמות מרכיב זה באמצעות " + this.measures![4].measureName;
      return false;
    }

    else {
      //המרת כמות מהרכיב לגרמים/ למ"ל
      this.ingredients![i]!.quantity! *= mForI!.grams!
      // פחות הכרחי - שינוי גם של שם וקוד אמצעי המדידה לגרמים
      this.ingredients![i].meashureID == this.measures![4].measureID;
      this.ingredients![i].measure == this.measures![4].measureName;
      this.ingredients![i]!.programerNote = ""; //לא צריך שום הודעה

    }//לבדוק אם אפשר להציב לתוך לט ת כלומר להחליף את this.ingredients![i].measure  לTEMP


    return true;
  }


  /** פונקציית המרה של כל אחד מהרכיבים ברשימה לגרמים מכל אמצעי מידה אחר */
  convertMeasureToGrams() {
    //כרגע נקבע שרירותית את האינדקס של 'גרם' אבל אחרי זה נקבל ונקבע אותו בסרוויס
    let temp: IngredientForRecipy;
    for (let i = 0; i < this.ingredients!.length; i++) {//עבור כל רכיב
      /**רכיב המתכון עליו אנו עובדות באיטרציה זו */
      temp = this.ingredients![i]
      //לחסוך המרות לחינם -  אם זה  כבר גרם או כבר האמצעי המבוקש - אין טעם להמיר     
      if (temp.measure != "גרם" && temp.meashureID != this.measure!.measureID) {
        /**הנתונים על כמות הגרמים שנכנסת באמצעי המידה המבוקש מהרכיב הנוכחי
         * אם יש כאלה נתונים
          */
        let mForI: measureForIngredient | undefined = this.measuresForIngredientsList!.
          find((m: measureForIngredient) =>
            m.ingredientID == temp!.ingridientID
            && m.measureID == this.measures![4].measureID //האידי של גרם בSQL הוא 5 לכן האינדקס 4
          );
        if (mForI == undefined) {
          //להודיע  למשתמש שאת השורה הזו אי אפשר להמיר
          this.ingredients![i]!.programerNote =
            "כרגע אין אפשרות להמיר את כמות רכיב זה ל" + this.measures![4].measureName
        }
        else {
          //המרת כמות מהרכיב לגרמים
          this.ingredients![i]!.quantity! *= mForI!.grams!
          // פחות הכרחי - שינוי גם של שם וקוד אמצעי המדידה לגרמים
          this.ingredients![i].meashureID == this.measures![4].measureID;
          this.ingredients![i].measure == this.measures![4].measureName;
          this.ingredients![i]!.programerNote = ""; //לא צריך שום הודעה
        }//לבדוק אם אפשר להציב לתוך לט ת כלומר להחליף את this.ingredients![i].measure  לTEMP
      }
    }
  }

  /**הנתונים על כמות הגרמים שנכנסת באמצעי המידה המבוקש מהרכיב הנוכחי
        * אם יש כאלה נתונים */
  findMeasureForIng(temp: IngredientForRecipy) {
    return this.measuresForIngredientsList!.
      find((m: measureForIngredient) =>
        m.ingredientID == temp!.ingridientID
        && m.measureID == this.measure!.measureID
      );
  }

  /**פונקציית המרת אמצעי המדידה */
  convertMeasure() {
    let temp: IngredientForRecipy;

    for (let i = 0; i < this.ingredients!.length; i++) {//עבור כל רכיב

      /**רכיב המתכון עליו אנו עובדות באיטרציה זו */
      temp = this.ingredients![i]


      //לחסוך המרות לחינם -  
      if (temp.grams == undefined && temp.grams == undefined) //אם אין נתונים על קיבולת או
      {                                            //!this.convertIngMeasureToGrams(i)) { //או שלא היה ניתן להמיר לגרמים
        //להודיע  למשתמש שאת השורה הזו אי אפשר להמיר
        this.ingredients![i]!.programerNote =
          "כרגע אין אפשרות להמיר את כמות רכיב זה ל" + this.measure!.measureName
        return;
      }

      //אם זה כבר האמצעי המבוקש - אין טעם להמיר     
      if (temp.meashureID == this.measure!.measureID)
        return;

      /**הנתונים על כמות הגרמים שנכנסת באמצעי המידה המבוקש מהרכיב הנוכחי
       * אם יש כאלה נתונים */
      let mForI: measureForIngredient | undefined = this.findMeasureForIng(temp);

      //אם אין פרטים - לא הכניסו רשומה של גרמים/מ"ל מרכיב זה באמצעי המבוקש
      if (mForI == undefined) {                                            //!this.convertIngMeasureToGrams(i)) { //או שלא היה ניתן להמיר לגרמים
        //להודיע  למשתמש שאת השורה הזו אי אפשר להמיר
        this.ingredients![i]!.programerNote =
          "כרגע אין אפשרות להמיר את כמות רכיב זה ל" + this.measure!.measureName
      }
      else {

        if (temp.grams != undefined && mForI.grams != undefined)
          //המרת הכמות מגרמים לאמצעי המדידה המבוקש על ידי חילוק
          this.ingredients![i]!.quantity! = temp.quantity! * temp.grams! / mForI.grams!;

        else {//המרת הכמות ממ"ל לאמצעי המדידה המבוקש על ידי חילוק
          this.ingredients![i]!.quantity! = temp.quantity! * temp.mililiters! / mForI.mililiters!;

        }
        //שינוי גם של שם וקוד אמצעי המדידה לאמצעי המבוקש
        this.ingredients![i].meashureID == this.measure!.measureID;
        this.ingredients![i].measure == this.measure!.measureName;
        this.ingredients![i].grams == mForI.grams!;
        this.ingredients![i].mililiters == mForI.mililiters!;
        this.ingredients![i]!.programerNote = ""; //לא צריך שום הודעה
      }

    }

  }



  /**פונקציית המרת אמצעי המדידה לאמצעים המקוריים */
  convertMeasureToOrginals() {

    /**רכיב המתכון עליו אנו עובדות באיטרציה זו */
    let temp: IngredientForRecipy;
    let mForI: measureForIngredient | undefined;

    for (let i = 0; i < this.ingredients!.length; i++) {//עבור כל רכיב
      temp = this.ingredients![i];


      // ============== המרת אמצעי רכיב רגיל ============     

      //אם זה כבר האמצעי המבוקש - אין טעם להמיר     
      if (temp.meashureID != this.measure!.measureID) {

        /**הנתונים על כמות הגרמים מהרכיב הנוכחי
         *  שנכנסת באמצעי המידה המבוקש - 
         * אם יש כאלה נתונים */
        mForI = this.findMeasureForIng(temp);
        //  temp!.grams! = mForI!.grams;



        if (temp.grams != undefined && mForI!.grams != undefined)
          //המרת הכמות מגרמים לאמצעי המדידה המבוקש על ידי חילוק
          this.ingredients![i]!.quantity! = temp.quantity! * temp.grams! / mForI!.grams!;

        else {//המרת הכמות ממ"ל לאמצעי המדידה המבוקש על ידי חילוק
          this.ingredients![i]!.quantity! = temp.quantity! * temp.mililiters! / mForI!.mililiters!;

        }
        //שינוי גם של שם וקוד אמצעי המדידה לאמצעי המבוקש
        this.ingredients![i].meashureID == this.measure!.measureID;
        this.ingredients![i].measure == this.measure!.measureName;
        this.ingredients![i].grams == mForI!.grams!;
        this.ingredients![i].mililiters == mForI!.mililiters!;
        this.ingredients![i]!.programerNote = ""; //לא צריך שום הודעה
      }


    }

  }

  //#endregion

  /**=================== הדפסת המתכון =====================  */
  printThisPage() {

    // console.log("==== " + window.document.getElementsByClassName("toPrint"));
    // var x = window.document.getElementsByClassName("toPrint");
    // var s:Element|null = x.item(1);


    // for (let index = 0; index < x.length; index++) {
    //   const element = x[index];

    //   window.document.append(element);
    // }

    // var w:any = window.frames;
    //לבדוק איך מדפיסים רק חלק מהדף
    //  w["toPrintHoYea"].document.write("sadfsgrtreew fewe edw");
    //  w["toPrintHoYea"].document.write( w.document.textContent);

    // w["toPrintHoYea"].print();
    window.print();

  }

  like() {
    this.currentRecipy!.likes! >= 1 ? this.currentRecipy!.likes!++ : this.currentRecipy!.likes! = 1;
    this.recipySer.recipiesList![this.recipySer.recipiesList.indexOf(this.currentRecipy)]!.likes! ++;
    //TODO - לטפל שיתעדכן בשרת
    // this.recSer.updateLikeRecipy().
  }



  //#region =========== שינוי כמות מנות ==================
  /** כמות המנות שיוצאת מהמתכון במצבו הנוכחי */

  currenNumOfportions: number = 1;

  /**
   * הקטנת מס המנות באחד - התאמת הכמות מכל רכיב לכך
   */
  decCurrenNumOfportions() {

    let prev = this.currenNumOfportions;

    if (this.currenNumOfportions <= 1)
      this.currenNumOfportions -= 0.25;
    else
      this.currenNumOfportions--;

    this.changeCurrenNumOfportions(prev);


  }

  /**
   * הגדלת מס המנות באחד - התאמת הכמות מכל רכיב לכך
   */
  incCurrenNumOfportions() {

    let prev = this.currenNumOfportions;

    if (this.currenNumOfportions < 1)
      this.currenNumOfportions += 0.25;
    else
      this.currenNumOfportions++;

    this.changeCurrenNumOfportions(prev);



  }

  /**
   * התאמת הכמות מכל רכיב למס המנות כפי ששונה בפונקציה הקוראת לפונקציה זו
   */
  changeCurrenNumOfportions(prev: number) {
    this.ingredients!.forEach(ing => {

      // טיפול ברכיב המקורי
      ing.quantity = (ing.quantity! / prev) *
        this.currenNumOfportions;

      // אם קיים - טיפול בתחליף לנטול גלוטן
      if (ing.glutenFreeIngridient != null)
        ing.glutenFreeQuantity = (ing.glutenFreeQuantity! / prev)
          * this.currenNumOfportions;

      // אם קיים - טיפול בתחליף בריא יותר
      if (ing.healthyIngridient != null)
        ing.healthyQuantity = (ing.healthyQuantity! / prev)
          * this.currenNumOfportions;

      // אם קיים - טיפול בתחליף לנטול בוטנים
      if (ing.glutenFreeIngridient != null)
        ing.nutFreeQuantity =
          (ing.nutFreeQuantity! / prev) * this.currenNumOfportions;

    });
  }

  //#endregion








  //#endregion

















  isNullOrUndefined(obg: any): boolean {
    return obg == null || obg == undefined;
  }


  
}

