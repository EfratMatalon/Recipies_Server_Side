import { Component, OnInit } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ingredientToAdd } from 'src/app/classes/ingredientToAdd';
import { IngredientForRecipy } from 'src/app/classes/IngredientsForRecipy';

@Component({
  selector: 'app-reccomened-to-add',
  templateUrl: './reccomened-to-add.component.html',
  styleUrls: ['./reccomened-to-add.component.css']
})
export class ReccomenedToAddComponent implements OnInit {

  // /** רשימת הרכיבים להוספה */
  // ingsToAdd:Array<ingredientToAdd> = [];
  
  // constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
    window.scrollTo({behavior:"auto",top:0});
  }

  // openModal(subType: string, currentIng: IngredientForRecipy) {

   
  //   this.modalRef = this.modalService.open( // פתיחת המודאל
  //     AddIng, // שם הקומפוננטה אותה נפתח כמודאל
  //     {
  //       data: { title: subType, ingredients: subIngs }, // המידע אותה נשלח לקומפוננטה כinput או params                 - איך שנקרא לזה
  //       modalClass: "modal-xl" // עיצובים למודאל ולסגנון הפתיחה שלו
  //     });


  //   // סגירת המודאל וקבלת המידע ממנו
  //   this.modalRef.onClose.subscribe((messege: any) => {
  //     // אם המודאל נסגר באישור - ולא בגלל ביטול או איקס
  //     if (messege !== 'close click' && messege.closeReason! != 'close click') {    // -------------- איך פותרים את בעית השגיאה בסגירה ע"י לחיצה על הרקע?
  //       console.log("מתוסף תחליף: " + messege);
  //       // הוספת פרטי התחליף לשדות המתאימים ברשומת רכיב למתכון
  //       switch (subType) {
  //         case 'טבעוני':
  //           if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
  //             console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
  //           else {
  //             currentIng.veganIngridientID = messege.i.ingridientID;
  //             currentIng.veganIngridient = messege.i.name;
  //             currentIng.veganQuantity = messege.q;
  //             currentIng.veganMeashureID = messege.m.measureID;
  //             currentIng.veganMeashure = messege.m.name;
  //             currentIng.veganNote = messege.n;

  //           }
  //           break;
  //         case 'ללא בוטנים':
  //           if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
  //             console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
  //           else {
  //             currentIng.nutFreeIngridientID = messege.i.ingridientID;
  //             currentIng.nutFreeIngridientName = messege.i.name;
  //             currentIng.nutFreeQuantity = messege.q;
  //             currentIng.nutFreeMeashureID = messege.m.measureID;
  //             currentIng.nutFreeMeashureName = messege.m.name;
  //             currentIng.nutFreeNote = messege.n;
  //           }
  //           break;
  //         case 'ללא גלוטן':
  //           if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
  //             console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
  //           else {
  //             currentIng.glutenFreeIngridientID = messege.i.ingridientID;
  //             currentIng.glutenFreeIngridient = messege.i.name;
  //             currentIng.glutenFreeQuantity = messege.q;
  //             currentIng.glutenFreeMeashureID = messege.m.measureID;
  //             currentIng.glutenFreeMeashure = messege.m.name;
  //             currentIng.glutenFreeNote = messege.n;

  //           }
  //           break;
  //         case 'בריא יותר':
  //           if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
  //             console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
  //           else {
  //             currentIng.healthyIngridientID = messege.i.ingridientID;
  //             currentIng.healthyIngridient = messege.i.name;
  //             currentIng.healthyQuantity = messege.q;
  //             currentIng.healthyMeashureID = messege.m.measureID;
  //             currentIng.healthyMeashure = messege.m.name;
  //             currentIng.healthyNote = messege.n;

  //           }
  //           break;
  //         case 'פרווה':
  //           if (currentIng.veganIngridientID != undefined) // לבדוק אם כך זה נראה כשלא נוגעים בו
  //             console.log("תחליף מסוג זה קיים כבר - האם אתה בטוח שברצונך להחליפו"); // במודאל נוסף
  //           else {
  //             currentIng.makeItParveID = messege.i.ingridientID;
  //             currentIng.makeItParve = messege.i.name;
  //             currentIng.parveQuantity = messege.q;
  //             currentIng.parveMeashureID = messege.m.measureID;
  //             currentIng.parveMeashure = messege.m.name;
  //             currentIng.parveNote = messege.n;

  //           }
  //           break;

  //         default:
  //           break;
  //       }
  //       console.log("התחליף " + subType + " התוסף בהצלחה - אולי נדוח על זה במודאל, או שנציג ברשימה");

  //     }
  //   });
  // }



}
