import { Component, OnInit } from '@angular/core';
import { MainCategoriesService } from 'src/app/services/main-categories.service';
import { mainCategory } from 'src/app/classes/mainCategory';
import { CategoriesService } from 'src/app/services/categories.service';
import { subCategory } from 'src/app/classes/category';
import { RecipiesService } from 'src/app/services/recipies.service';
import { recipy } from 'src/app/classes/recipy';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {


  recomenedRec: Array<recipy> | undefined;
   /** רשימת סוגי התחליפים */
   substitute: Array<any> = [
    // {key: "healthy", val:"בריא יותר"},
    {key: "isParve", val:"נטול לקטוז"},
    {key: "isGlutenFree", val:"נטול גלוטן"},
    {key: "isNutFree", val: "נטול בוטנים"},
    {key: "isVegan", val: "טבעוני"},
    {key: "isVegan", val: "צמחוני"}
  ];

  /** רשימת סוגי הכשרויות */
  kosher: Array<any> = [
    // {key: "healthy", val:"בריא יותר"},
    {key: "isParve", val:"פרווה"},
    {key: "isMeaty", val:"בשרי"},
    {key: "isDairy", val: "חלבי"}
  ];

  constructor(public mCatSer: MainCategoriesService,
    private router: Router,
    public userSet: UsersService,

    public sCatSer: CategoriesService,
    public resSer: RecipiesService) {

  }
  /**
* פונקציה המעבירה לדף המלא של המתכון בעל הקוד שהתקבל
* (בד"כ נקראת ע"י הלחיצה  על כרטיסיית המתכון)
* @param recipyID 
*/
  fullResipy(recipyID: any) {
    //     .subscribe((data: any) => {

    //       /** קוד קטגוריה רצויה  */
    //      /**/ console.log(data);

    // },
    //   (err: Error) => { console.log(err); }
    // )


    debugger;
    console.log(this.userSet.currentUser + " ====" + this.userSet.currentUser.userID);

    //אם אורח - השאר בניתוב הרגיל
    if (this.userSet.currentUser.userID == undefined) {
      this.router.navigate(['/full', recipyID]);
      return;
    }


    // אם מנהל - חזור לניתוב מנהל בסיסי
    if (this.userSet.currentUser!.firstName! == "מערכת" && this.userSet.currentUser.lastName == "food4U")
      this.router.navigate(['admin/IWantMakePeopleFillGood', this.userSet.currentUser!.userID!, 'full', recipyID]);
    else
      this.router.navigate(['/private', this.userSet.currentUser!.userID!, 'full', recipyID]);







    //         //אם אורח - השאר בניתוב הרגיל
    //   if (this.userSet.currentUser.userID! > 0) 
    //   this.router.navigate(['private', this.userSet.currentUser!.userID!, 'full', recipyID]);

    // // אם מנהל - חזור לניתוב מנהל בסיסי
    // if(this.userSet.currentUser.firstName == "מערכת" && this.userSet.currentUser.lastName == "food4U")
    //     this.router.navigate(['admin/IWantMakePeopleFillGood', this.userSet.currentUser!.userID!, 'full', recipyID]);
    // else
    //      this.router.navigate(['/full', recipyID]);


  }





  ngOnInit(): void {


  }

}
