import { Component, OnInit } from '@angular/core';
import { TemporaryStorageFacet, TemporaryStorageService } from 'src/app/saveForm/temporary-storage.service';
import { ingredient } from 'src/app/classes/ingredient';
import { measure } from 'src/app/classes/measure';
import { subCategory } from 'src/app/classes/category';
import { IngredientForRecipy } from 'src/app/classes/IngredientsForRecipy';
import { RecipiesService } from 'src/app/services/recipies.service';
import { IngredientsForRecipyService } from 'src/app/services/ingredients-for-recipy.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { UsersService } from 'src/app/services/users.service';
import { MeasuresService } from 'src/app/services/measures.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { recipy } from 'src/app/classes/recipy';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { AddSubuteComponent } from '../add-subute/add-subute.component';
import { NewRecipyFormData } from 'src/app/classes/NewRecipyFormData';
import { AddIngComponent } from '../add-ing/add-ing.component';
import { AddMeasureToIngComponent } from '../add-measure-to-ing/add-measure-to-ing.component';
import { Router } from '@angular/router';
import { ingredientToAdd } from 'src/app/classes/ingredientToAdd';
import { DatePipe, SlicePipe } from '@angular/common';





@Component({
  selector: 'app-add-recipy',
  templateUrl: './add-recipy.component.html',
  styleUrls: ['./add-recipy.component.css']
})
export class AddRecipyComponent implements OnInit {


  /** המתכון אותו מממלא הטופס יוצר מאחורי בקלעים */
  public formData: NewRecipyFormData;
  /** כל הפונקציות והשרותים שנצטרך בשביל לשמור בלוקל סטורג' */
  private temporaryStorage: TemporaryStorageFacet;


  /**רשימת כל המרכיבים שיש - אפשר להשתמש בזו שיושבת בסרוויס*/
  ingredients: Array<ingredient> | undefined;
  /**רשימת כל אמצעי המדידה שיש - אפשר להשתמש בזו שיושבת בסרוויס*/
  measures: Array<measure> | undefined;
  /**רשימת כל תתי הקטגוריות שיש - אפשר להשתמש בזו שיושבת בסרוויס*/
  categories: Array<subCategory> | undefined;
  /** המשתמש הנוכחי שמוסיף עכשיו מתכון ועל שמו יקרא המתכון - אמור לשבת ולהגיע מסרוויס משתמשים */
  userId: number = 1;
  isEdit: boolean = false;
  ingridientIndex: number = -1;

  // /** קובץ התמונה אותה נעלה */
  handleFileInput(file: any) {
    debugger
    let prevImg = (this.formData.image! == null ? "" : this.formData.image!);
    this.rSer.uploadImage(file.files[0], prevImg).subscribe(
      (data: any) => {
        debugger;
        this.formData.image = data;//file.files[0].name;
      }
    );
  }

  /**
   * פונקציה המעדכנת את הרכיב להוספה לרכיב הנבחר,
   *  ואת שם הרכיב שבינפוט לשם הרכיב הנבחר
   * @param selectedIng הרכיב הנבחר בסלקט
   */
  onSelectIng(selectedIng: ingredient) {
    this.ingridient = selectedIng;
    this.selectedIngridientName = selectedIng!.name!;
  }

  /**הרכיב הנוכחי , שכעת מתמלא ויתוסף למתכון */
  ingridient: ingredient | undefined;
  /**כלי מדידה שנבחר לרכיב התוסף כעת */
  measure: measure | undefined;
  /**כמות לרכיב המתוסף כעת */
  ingridientQ: number | undefined;
  /**הערה לרכיב המתוספת כעת */
  ingridientNote: string | undefined;
  /** ההפניה לקומפננטת המודל שתפתח בלחיצה על "הוסף תחליף "*/
  modalRef: MdbModalRef<ModalComponent> | null = null;
  /** ההפניה לקומפננטת המודל שתפתח בלחיצה על "הוסף תחליף "*/
  //modalRef: MdbModalRef<AddIngComponent> | null = null;

  /** ההפניה לקומפננטת המודל שתפתח בלחיצה על "הוסף תחליף "*/
  modalRefMeasure: MdbModalRef<AddMeasureToIngComponent> | null = null;



  /**בנאי לו מוזרקים כל השירותים */
  constructor(public /**שירות למתכונים */rSer: RecipiesService,
    public iSer: IngredientsService, public iFrSer: IngredientsForRecipyService,
    public userSer: UsersService,
    temporaryStorageService: TemporaryStorageService
    , public measuresSer: MeasuresService
    , public categoriesSer: CategoriesService,
    private modalService: MdbModalService,
    private router: Router) {

    // The TemporaryStorageService is a glorified key-value store. And, for this
    // component, we are going to store all of the temporary form-data in a single
    // key. As such, we can make our lives easier by creating a "Facet" of the
    // temporary storage, which locks-in a key, allowing us to make subsequent calls
    // against the facet without providing a key.
    this.temporaryStorage = temporaryStorageService.forKey("new_recipy_form");
    //"_" + this.userSer.currentUser.userID!

    debugger
    // אתחול שדות מופע המתכון הזמני
    this.formData = {
      name: "",
      description: "",
      image: "",
      imgToLoad: {},
      category: {},
      time: "",
      level: 1,
      numOfportions: 1,
      poritionDesc: "",
      ingFr: [],
      instractions: "",
      recipyNotes: "",
      userID: this.userSer!.currentUser!.userID
    };
  }



  /**פונקציית הטעינה של הקומפוננטה */
  ngOnInit(): void {
    window.scrollTo({ behavior: "auto", top: 0 });

    // //טעינת רשימת הרכיבים משרת C#
    // this.iSer.GetAll().subscribe(
    //   (data: any) => { debugger; this.ingredients = data; },
    //   (err: ErrorEvent) => { console.log(err); }
    // )

    //טעינת הערכים ההתחלתיים של שדות הוןפס מהאחסון הלוקלי
    this.restoreFromTemporaryStorage();

  }

  //#region פונקציות הקשורות לשמירת הטופס באחסון הלוקלי כדי שלא יאבד בריענון

  // I attempt to load persisted data from our Facet of the TemporaryStorageService
  // into the current view-model of the form-data.
  public async restoreFromTemporaryStorage(): Promise<void> {

    var cachedFormData = await this.temporaryStorage.get<NewRecipyFormData>();
    debugger
    if (cachedFormData && this.userSer.currentUser.userID == cachedFormData.userID!) {
      debugger

      Object.assign(this.formData, cachedFormData);

    }

  }


  // שומרים את מצב הטופס הנוכחי באחסון הלוקלי.
  public saveToTemporaryStorage(): void {

    console.log("חברה משהו קורה");

    // NOTE: If I wanted to save a tiny bit of memory, I could check to see if any of
    // the form-data was actually populated before I persisted it to the temporary
    // storage. But, seeing as I would generally remove this data during the
    // ngOnDestroy() life-cycle event, there's really no need to make the code more
    // "clever" than it has to be.
    this.temporaryStorage.set(this.formData);

  }

  //#endregion



  //
  /**
   * בדיקת תקינות של רכיב
   */addIng() {

    if (this.ingridient === undefined || this.ingridient === null || this.ingridient.name! != this.selectedIngridientName!)

      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "חובה לבחור ברכיב מתוך הרשימה, אם הרכיב אינו מופיע בה - ניתן להוסיף רכיב חדש" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });

    else {

      console.log(this.ingridient!.name);

      let flag = false;
      // =============== בדיקת תקינות - שהרכיב אינו ברשימה =============================
      for (let index = 0; index < this.formData.ingFr!.length; index++) {
        if (this.formData.ingFr![index]!.ingridientID == this.ingridient!.ingridientID) {
          //TODO
          //flag = true;

          //  ==== הודעה למשתמש ====
          this.modalRef = this.modalService.open(
            ModalComponent,//קומפוננטת ההודעה שתפתח
            {
              data: // ההודעה שתוצג למשתמש
                { title: "כבר הוספת רכיב זה" },
              modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
            });

          //  אולי לפתוח מודאל כי "רכיב בשם זה כבר קיים במתכון - מה כונתך לעשות? "
          //ערוך, הוסף בכל מקרה, בטל
          break;
        }
      }
      if (!flag) {
        // ================ אם זו הפעם הראשונה שרכיב כזה מתוסף ========================
        this.formData.ingFr!.push(
          new IngredientForRecipy(0, 0, // קוד רכיב למתכון, וקוד מתכון - זמניים עד שיגיעו לדאטאבייס
            this.ingridient!.ingridientID, this.ingridient!.name, //שם וקוד הרכיב עצמו
            this.ingridientQ, // כמות
            this.measure!.measureID!, this.measure!.measureName!, this.measure!.pluralForm//,// שם וקוד אמצעי המדידה
            // this.ingridientNote // הערה
          ));

        debugger;
        this.ingridient = {};
        this.ingridientNote = "";
        this.ingridientQ = 0;
        this.measure = {};
        this.selectedIngridientName = "";
      }
    }

  }

  editIng(i: IngredientForRecipy) {
    //TODO
    this.isEdit = true;
    this.ingridientIndex = this.formData.ingFr!.indexOf(i!);
    this.ingridientNote = i.note;
    this.ingridientQ = i.quantity;
    this.measure = this.measures!.filter(m => m.measureID == i.meashureID)[0];
    this.selectedIngridientName = i!.ingredientName!;
  }

  subsTypes: Array<string> =
    ['טבעוני', 'ללא בוטנים', 'ללא גלוטן', 'בריא יותר', 'פרווה']

  // לברר למה המודאל מזיז קצת את הדף - אולי בגלל תגית הקישור, ולמה אין מסך אפרפר
  /**
   *  הפונקציה שפותחת את מודאל הוספת הרכיב - צריך להיות פה עוד לוגיקה 
   * @param subType סוג התחליף שמוסיפים
   * @param currentIng הרכיב לו מוסיפים תחליף
   */
  openModal(subType: string, currentIng: IngredientForRecipy) {

    /** רשימת רכיבים העונים על דרישות התחליף */
    let subIngs: Array<ingredient> = [];
    // סינון רשימת המרכיבים במודאל - כך שתכיל רק רכיבים העונים על דרישות התחליף הנבחר
    switch (subType) {
      case 'טבעוני':
        subIngs = this.iSer.ingredients!.filter((i: ingredient) => i.isVegan == true);
        break;
      case 'ללא בוטנים':
        subIngs = this.iSer.ingredients!.filter((i: ingredient) => i.isNutFree == true);
        break;
      case 'ללא גלוטן':
        subIngs = this.iSer.ingredients!.filter((i: ingredient) => i.isGlutenFree == true);
        break;
      case 'בריא יותר':
        subIngs = this.iSer.ingredients!;
        break;
      case 'פרווה':
        subIngs = this.iSer.ingredients!.filter((i: ingredient) => i.isParve == true);
        break;
      default:
        break;
    }

    this.modalRef = this.modalService.open( // פתיחת המודאל
      AddSubuteComponent, // שם הקומפוננטה אותה נפתח כמודאל
      {
        data: { title: subType, ingredients: subIngs }, // המידע אותה נשלח לקומפוננטה כinput או params                 - איך שנקרא לזה
        modalClass: "modal-xl" // עיצובים למודאל ולסגנון הפתיחה שלו
      });


    // סגירת המודאל וקבלת המידע ממנו
    this.modalRef.onClose.subscribe((messege: any) => {
      // אם המודאל נסגר באישור - ולא בגלל ביטול או איקס
      if (messege !== 'close click' && messege.closeReason! != 'close click') {    // -------------- איך פותרים את בעית השגיאה בסגירה ע"י לחיצה על הרקע?
        console.log("מתוסף תחליף: " + messege);
        // הוספת פרטי התחליף לשדות המתאימים ברשומת רכיב למתכון
        switch (subType) {
          case 'טבעוני':
            if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
              console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
            else {
              currentIng.veganIngridientID = messege.i.ingridientID;
              currentIng.veganIngridient = messege.i.name;
              currentIng.veganQuantity = messege.q;
              currentIng.veganMeashureID = messege.m.measureID;
              currentIng.veganMeashure = messege.m.name;
              currentIng.veganNote = messege.n;

            }
            break;
          case 'ללא בוטנים':
            if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
              console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
            else {
              currentIng.nutFreeIngridientID = messege.i.ingridientID;
              currentIng.nutFreeIngridient = messege.i.name;
              currentIng.nutFreeQuantity = messege.q;
              currentIng.nutFreeMeashureID = messege.m.measureID;
              currentIng.nutFreeMeashure = messege.m.name;
              currentIng.nutFreeNote = messege.n;
            }
            break;
          case 'ללא גלוטן':
            if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
              console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
            else {
              currentIng.glutenFreeIngridientID = messege.i.ingridientID;
              currentIng.glutenFreeIngridient = messege.i.name;
              currentIng.glutenFreeQuantity = messege.q;
              currentIng.glutenFreeMeashureID = messege.m.measureID;
              currentIng.glutenFreeMeashure = messege.m.name;
              currentIng.glutenFreeNote = messege.n;

            }
            break;
          case 'בריא יותר':
            if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
              console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
            else {
              currentIng.healthyIngridientID = messege.i.ingridientID;
              currentIng.healthyIngridient = messege.i.name;
              currentIng.healthyQuantity = messege.q;
              currentIng.healthyMeashureID = messege.m.measureID;
              currentIng.healthyMeashure = messege.m.name;
              currentIng.healthyNote = messege.n;

            }
            break;
          case 'פרווה':
            if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
              console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
            else {
              currentIng.parveIngridientID = messege.i.ingridientID;
              currentIng.parveIngridient = messege.i.name;
              currentIng.parveQuantity = messege.q;
              currentIng.parveMeashureID = messege.m.measureID;
              currentIng.parveMeashure = messege.m.name;
              currentIng.parveNote = messege.n;

            }
            break;

          default:
            break;
        }
        console.log("התחליף " + subType + " התוסף בהצלחה - אולי נדוח על זה במודאל, או שנציג ברשימה");


      }
    });
  }





  /**
  *  הפונקציה שפותחת את מודאל הוספת הרכיב - צריך להיות פה עוד לוגיקה 
  * @param subType סוג התחליף שמוסיפים
  * @param currentIng הרכיב לו מוסיפים תחליף
  */
  openModalAddIng() {
    debugger;

    /** רשימת רכיבים העונים על דרישות התחליף */
    let subIngs: Array<ingredient> = [];

    this.modalRef = this.modalService.open( // פתיחת המודאל
      AddIngComponent, // שם הקומפוננטה אותה נפתח כמודאל
      {
        data: {}, // המידע אותה נשלח לקומפוננטה כinput או params                 - איך שנקרא לזה
        modalClass: "modal-s" // עיצובים למודאל ולסגנון הפתיחה שלו
      });


    // סגירת המודאל וקבלת המידע ממנו
    this.modalRef.onClose.subscribe((messege: any) => {
      // אם המודאל נסגר באישור - ולא בגלל ביטול או איקס
      if (messege !== 'close click' && messege!.closeReason! != 'close click') {    // -------------- איך פותרים את בעית השגיאה בסגירה ע"י לחיצה על הרקע?
        debugger;
        console.log("מתוסף רכיב חדש: " + messege.newIng.ingridientID);
        this.ingridient = messege!.newIng!;
        this.selectedIngridientName = messege.newIng!.name;


        this.modalRefMeasure = this.modalService.open( // פתיחת המודאל
          AddMeasureToIngComponent, // שם הקומפוננטה אותה נפתח כמודאל
          {
            data: { newIngID: messege.newIng.ingridientID }, // המידע אותה נשלח לקומפוננטה כinput או params                 - איך שנקרא לזה
            modalClass: "modal-xl" // עיצובים למודאל ולסגנון הפתיחה שלו
          });

        this.modalRefMeasure.onClose.subscribe((messege: any) => {
          // אם המודאל נסגר באישור - ולא בגלל ביטול או איקס
          if (messege !== 'close click' && messege!.closeReason! != 'close click') {    // -------------- איך פותרים את בעית השגיאה בסגירה ע"י לחיצה על הרקע?
            console.log(" אמצעי מדידה לרכיב חדש התוספו בהצלחה: " + messege);
            console.log("התחליף " + " התוסף בהצלחה - אולי נדוח על זה במודאל, או שנציג ברשימה");

            //רענון רשימת הרכיבים - כך שתכיל גם את הרכיב החדש
            this.iSer.GetAll().subscribe(
              (data: any) => { debugger; this.iSer.ingredients = data; },
              (err: Error) => { console.log(err); }
            )

          }
        }
        );


      }
    })
  }

  selectedIngridientName: string = "";

  f() {
    console.log("============ f happennnnnnnnnnnnnnnnnnnnnn ===============");

  }

  //#region קבלת שדות הטופס
  getRecipyName() {
    return this.formData.name;//this.myForm.controls['fName'];
  }
  getDescription() {
    return this.formData.description;//this.myForm.controls['description'];
  }
  getImage() {
    debugger;
    return this.formData.image;
  }

  getTime() {
    return this.formData.time;//this.myForm.controls['time'];
  }

  getLevel() {
    return this.formData.level;//this.myForm.controls['level'];
  }

  getNumOfportions() {
    return this.formData.numOfportions;//this.myForm.controls['numOfportions'];
  }

  getPortionDesc() {
    return this.formData.poritionDesc;//this.myForm.controls['poritionDesc'];
  }

  getCategory() {
    return this.formData.category;//this.myForm.controls['instractions'];
  }

  getInstractions() {
    return this.formData.instractions;//this.myForm.controls['instractions'];
  }

  getNotes() {
    return this.formData.recipyNotes;//this.myForm.controls['instractions'];
  }
  //#endregion



  /**
   * פונקצית שליחת המתכון לשרת שיוסיף אותו למסד הנתונים 
   * כדאי למדל לפונקציות מסודרות וקטנות - ופה רק לקרוא להם
   *  - השאלה איך זה בדיוק קורה אסינכרונית 
   * - לשאול את מינצר
   */
  save() {

    // debugger;
    // צריך לחשוב אם פה או בשרת
    //לבינתיים נעשה את זה פה
    // ===========  עוברים על הרכיבים ומסווגים את המתכון =======================

    /** פרטי הרכיב המלאים - משירות הרכיבים */
    let ingToCheck: ingredient = {};

    // סיווג כשרותי - ניתן לבצע גם תוך כדי
    let isParve: boolean = true;
    let isDairy: boolean = false;
    let isMeaty: boolean = false;

    // בדיקות סיווגים
    let isGlutenFree: boolean = true;
    let isVegan: boolean = true;
    let isNutFree: boolean = true;

    // בדיקות תחליפים
    let mGlutenFree: boolean = false;
    let mVegan: boolean = false;
    let mNutFree: boolean = false;
    let isHealthierSubtute: boolean = false;

    for (let index = 0; index < this.formData.ingFr!.length; index++) {
      ingToCheck = this.iSer.ingredients!.find(i =>
        i.ingridientID == this.formData.ingFr![index].ingridientID)!;

      debugger;
      // ================ בדיקת כשרות ===========
      if (ingToCheck.isDairy == true) {
        if (isMeaty) {// אם  עם בשר בחלב

          //  ==== הודעה למשתמש ====
          this.modalRef = this.modalService.open(
            ModalComponent,//קומפוננטת ההודעה שתפתח
            {
              data: // ההודעה שתוצג למשתמש
                { title: "התורה אוסרת על בשר בחלב - נא תקן את הטעון תיקון, ואז נסה שנית" },
              modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
            });

          return; // ונצא מהפונקציה בלי להעלות את המתכון
        }
        // אחרת
        isDairy = true; //נסמן שהמתכון חלבי
        isParve = false;// ואינו פרווה
      }

      if (ingToCheck.isMeaty == true) {
        if (isDairy) {// אם  עם בשר בחלב

          //  ==== הודעה למשתמש ====
          this.modalRef = this.modalService.open(
            ModalComponent,//קומפוננטת ההודעה שתפתח
            {
              data: // ההודעה שתוצג למשתמש
                { title: "התורה אוסרת על בשר בחלב - נא תקן את הטעון תיקון, ואז נסה שנית" },
              modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
            });

          return; // ונצא מהפונקציה בלי להעלות את המתכון
        }
        // אחרת
        isMeaty = true; //נסמן שהמתכון בשרי
        isParve = false;// ואינו פרווה
      }

      // ============= שאר הבדיקות ===========

      // -------------בדיקת גלוטן -------------
      if (isGlutenFree && // אם עדיין יש טעם לבדוק את זה - עשוי לחסוך תנאי 
        !ingToCheck.isGlutenFree) // אם הרכיב אינו מסווג כנטול גלוטן וגם
      {
        if (this.formData.ingFr![index].glutenFreeIngridientID == null) // אין לו תחליף נטול גלוטן
          isGlutenFree = false; //נסמן שהמתכון מכיל גלוטן
        else
          mGlutenFree = true;

      }

      //  ----------- בדיקת אגוזים --------------
      if (isNutFree && // אם עדיין יש טעם לבדוק את זה - עשוי לחסוך תנאי 
        !ingToCheck.isNutFree) // אם הרכיב אינו מסווג כנטול אגוזים וגם
      {
        if (this.formData.ingFr![index].nutFreeIngridientID == null) // אין לו תחליף נטול אגוזים
          isNutFree = false; //נסמן שהמתכון מכיל אגוזים
        else
          mNutFree = true;
      }


      // ---------- בדיקת טבעונות -------------------
      if (isVegan && // אם עדיין יש טעם לבדוק את זה - עשוי לחסוך תנאי 
        !ingToCheck.isVegan) // אם הרכיב אינו מסווג כטבעוני וגם
      {
        if (this.formData.ingFr![index].veganIngridientID == null) // אין לו תחליף טבעוני
          isGlutenFree = false; //נסמן שהמתכון מכיל גלוטן
        else
          mVegan = true;
      }

      // ------------ בדיקה אם מכיל לפחות תחליף אחד בריא  -----------------
      if (this.formData.ingFr![index].healthyIngridientID != null) {
        isHealthierSubtute = true;
      }

    }




    //לחשוב אם ה"יכול ךהפוך ל" צריך בדיקה פה או אוטמטית בכל הוספה

    //debugger;
    // ================ יצירת המתכון ==================
    let r: recipy = new recipy();
    r.name = this.getRecipyName();//.value, // שם המתכון
    r.description = this.getDescription();//.value, //תאור המתכון
    r.image = this.getImage(); //שם התמונה - בשרת נשנה את שמה לשם המתכון
    r.time = this.getTime(); //משך זמן הכנה
    r.numOfportions = this.getNumOfportions();//.value, //מס מנות
    r.portionDescription = this.getPortionDesc();//.value,//תאור המנה
    r.dificultLevel = this.getLevel();
    r.categoryID = this.getCategory().categoryID;
    r.notes = this.getNotes();
    r.instractions = this.getInstractions();//.value, // הוראות
    //אולי בעתיד נחליף אתן לליסט שלם
    r.writerId = this.formData!.userID; // קוד לקוח



    //========== עדכון סיווגי המתכון ============
    r.isParve = isParve;
    r.isDairy = isDairy;
    r.isMeaty = isMeaty;
    r.isGlutenFree = isGlutenFree;
    r.isNutFree = isNutFree;
    r.isVegan = isVegan;
    r.makeItHealthy = isHealthierSubtute;
    r.makeItGlutenFree = mGlutenFree;
    r.makeItNutFree = mNutFree;
    r.makeItVegan = mVegan;

    console.log(r);
    console.log(" לפני הוספת מתכון" + this.formData.ingFr!);

    // =================== הוספת המתכון ================
    this.rSer.AddRecipy(r)
      .subscribe(

        // ============== קבלת קוד המתכון =============
        (data: any) => {
          console.log("בהוספת מתכון" + this.formData.ingFr!);
          console.log("אנחנו באמצע הוספה");
          console.log("הדטה שקבלנו הוא קוד המתכון והוא:" + data);

          if (data > 0)  // ============== אם הצלחנו להוסיף מתכון =============
          {

            // ============= העלאת התמונה לשרת ================            
            debugger;
            console.log("קבלנו עכשיו את קוד המתכון" + data + "- על מנת שנוכל להוסיף רכיבים");
            console.log(" לפני הוספת רכיבים" + this.formData.ingFr!);


            // ============= אם הצלחנו - הוספת רכיבים למתכון ============
            this.iFrSer.AddIngredientsForPraticularRecipy(
              data, this.formData.ingFr!).subscribe(
                (data: any) => {
                  console.log(" בהוספת רכיבים");
                  console.table(this.formData.ingFr!);
                  console.log(" אנחנו באמצע הוספת רכיבים\nדטה הוא:");
                  console.table(data);


                  if (data > 0) {

                    //  ==== הודעה למשתמש ====
                    this.modalRef = this.modalService.open(
                      ModalComponent,//קומפוננטת ההודעה שתפתח
                      {
                        data: // ההודעה שתוצג למשתמש
                          { title: "המתכון שפרסמת נקלט בהצלחה, תודה על שהקדשת מזמנך לתועלת הציבור!" },
                        modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
                      });

                    console.log(data + " הרכיבים נוספו בהצלחה");
                    // ========= אם הצלחנו להוסיף - לא צריך יותר לשמור את המתכון בלוקל הוסט =======
                    this.temporaryStorage.remove();
                    console.log("הזיכרון נוקה");
                    //TODO
                    this.router.navigateByUrl("/private/" + this.userSer.currentUser.userID + "/home");

                  }
                },
                (err: ErrorEvent) => { console.log("נפלנו בהוסםת רכיבים למתכון " + err); }
              )
          }
          else // ======= אם נכשלה ההוספה ===================
            console.log("לא קבלנו את קוד המתכון, אולי לא נכנס המתכון, אולי רק לא הצלנו להוסיף את רכיבי המתכון");
        },
        (err: ErrorEvent) => {
          console.log(err);
          console.log("לא הצלחנו להוסיף מתכון - נפלנו איפושהוא בהוספה שלו עצמו");
        }

      );
  }





  /**
   * ריקון הקובץ
   */
  resetAll() {
    this.rSer.deleteImage(this.formData.image!).subscribe(
      (succsseed: any) => {
        this.formData.image = "";
        this.formData.ingFr = [];
      },
      (err: Error) => {
        console.log(err);
      });
  }




  /** שם קטגוריה - לסינון המתכונים */
  catToSearch: string = "";
  /** אותיות לחיפוש - לסינון המתכונים */
  strToSearch: string = "";

  /** רשימת סוגי התחליפים */
  substitute: Array<any> = [
    { key: "healthy", val: "בריא יותר" },
    { key: "parve", val: "פרווה" },
    { key: "glutenFree", val: "נטול גלוטן" },
    { key: "nutFree", val: "נטול בוטנים" },
    { key: "vegan", val: "טבעוני" },
    { key: "vegan", val: "צמחוני" }
  ];

  substitutes: Array<string> = [
    "parve",
    "vegan",
    "healthy",
    "glutenFree",
    "nutFree"
  ];

  /**
   * רשימת השדות - הפרטים הרלוונטים לכל תחליף
   */
  fileds: Array<string> = [
    "Quantity", "MeashureName", "Ingridient", "Note"
  ];


  /**
   * פונקציית המרה לטייפ אני
   * @param i פריט שרוצים להמיר
   */
  getAny(i: IngredientForRecipy): any {
    return i;
  }


  removeSub(i: number, subKey: string) {
    //TODO
    console.info("sub " + subKey + " removed");
    this.formData.ingFr![i].isSubsShow = false;
    for (let index = 0; index < this.fileds.length; index++) {
      let filed = this.fileds[index];
      (this.formData.ingFr![i] as any)![subKey + filed] = null;

    }

  }

}


