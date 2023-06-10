import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { ingredient } from 'src/app/classes/ingredient';

@Component({
  selector: 'app-add-ing',
  templateUrl: './add-ing.component.html',
  styleUrls: ['./add-ing.component.css']
})


/**
 * קומפוננטה זו מכילה טופס לקבלת הפרטים הבסיסיים על רכיב שרוצים להוסיף - 
 * שם, סיווג כשרותי ואלרגני, ערכים תזונתיים
 * רכיב תקין יישמר במסד, והמכניס יועבר לעדכון אמצעי מדידה עבורו
 */
export class AddIngComponent implements OnInit {

  //TODO שסיווג כשרותי יישמר בדאטא-בייס

  constructor(public ingSer: IngredientsService,
    public modalRef: MdbModalRef<AddIngComponent>) { }

  ngOnInit(): void {
  }


  newIng:ingredient = 
  { isGlutenFree: false, isNutFree:false, isVegan: false,
    isDairy:false,isMeaty:false, isParve:true};
  t:string = '';
  
  parve(){
    debugger
    this.newIng.isParve = true;
    this.newIng.isDairy = false;
    this.newIng.isMeaty = false;
  }

  dairy(){
    debugger
    this.newIng.isParve = false;
    this.newIng.isDairy = true;
    this.newIng.isMeaty = false;
  }

  meaty(){
    debugger;
    this.newIng.isParve = false;
    this.newIng.isDairy = false;
    this.newIng.isMeaty = true;
  }

  close(closeReason: string): void {
    //בדיקות תקינות שונות
    debugger;
    // הוספת הרכיב לDB
    this.ingSer.AddIngredient(this.newIng).subscribe(

      // ============== קבלת קוד הרכיב =============
      (data: any) => {
        if (data > 0) {
          this.newIng!.ingridientID = data;
          console.log("======== " + this.newIng!.name + "========== " + this.newIng.ingridientID);
          
          //העברת קוד הרכיב לקומפוננטה הקוראת 
          //- ע"מ שתעביר לקומוננטת הוספת אמצעי מדידה לרכיב
          this.modalRef.close({
            closeReason: closeReason, // סיבת הסגירה
            newIng:this.newIng
          })
        }
        else{
          alert("המערכת נתקלה בבעיה, נא נסה שנית");
        }
      },
    (err:Error) => {
      alert("המערכת נתקלה בבעיה, נא נסה שנית");


    })
    
  }





}
