import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { recipy } from 'src/app/classes/recipy';
import { RecipiesService } from 'src/app/services/recipies.service';
import { UsersService } from 'src/app/services/users.service';
import { FocusMonitor, FocusKeyManager } from '@angular/cdk/a11y';
import { Type } from '@angular/compiler';



@Component({
  selector: 'app-showrecepies',
  templateUrl: './showrecepies.component.html',
  styleUrls: ['./showrecepies.component.css']
})
export class ShowrecepiesComponent implements OnInit {

  /** האם לחפש לפי שם כותב המתכון */
  searchWriter: boolean = false;
  /** מחרוזת לחיפוש האם שם המתכון/שם יומרו מכילים אותה*/
  strToSearch: string = "";
  /** שם שדה - למיון רשימת המתכוני על פי הערך שבו */
  filedOrderBy: string = 'name';
  /** האם לעשות רוורס למיון */
  desc: boolean = false;
  ///** האם הערך שבשדה הוא מסוג מספר */
  isNumeric: boolean = false;
  /** מס קטגוריה - לחיפוש המתכונים שזו הקטגוריה שלהם */
  catID: number | undefined;// TODO - האם להפוך לסוג אני
  /** האם להציג ספינר */
  isLoading: boolean = false;
  /** רשימת המתכונים */
  listRecepies: Array<recipy> | undefined;
  /** שם התכונה המיוחדת של המתכון שרותים שתהיה טרו  */
  special: string | undefined;
  /** תמיד טרו  */
  isSpecial: boolean = true;



  constructor(public recipySer: RecipiesService,
    private router: Router,
    public myactiveRoute: ActivatedRoute,
    public userSet: UsersService) {

  }
  ngOnInit(): void {

    window.scrollTo({behavior:"auto",top:0});
    debugger
    this.recipySer.GetAll().subscribe(
      (data: any) => { this.listRecepies = data },
      (err: Error) => { console.log(err); }
    )

    // קבלת קוד קטגוריה רצויה מהנתיב
    this.myactiveRoute.params.subscribe((data: any) => {
      debugger
      if (data['catID'] == -1) // במקרה שרוצים להציג את כל המתכונים
      {
        this.catID = undefined;
        this.special = undefined;
        return;
      }
      if (isNaN(data['catID'])) // במקרה שרוצים להציג מתכונים לרגישים
      {
        this.catID = undefined;
        this.special = data['catID'];
      }
      else   // קוד קטגוריה רצויה  
      {
        this.catID = data['catID'];
        this.special = undefined;
      }
      window.scrollTo({behavior:"auto",top:0});
    },
      (err: Error) => { console.log(err); }
    )
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
      // window.open(`${window.origin}/full/${recipyID}`,"_blank")
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


  /**
   * פונקציה שתגרום שבעת בקשה למיון המתכונים, יוצג ספינר למשך חצי שניה , לתת למשתמש תחושה שמשהו קורה
   */
  loading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }

  show(desc: string) {
    console.log("1234567".substr(2, 9));

    return desc.substring(0, 40);
  }

  cont(desc: string) {

    return desc.length > 20 ? desc.substring(40) : null;
  }
}
