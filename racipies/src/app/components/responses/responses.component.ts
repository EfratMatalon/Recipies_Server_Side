import { Component, OnInit, Input, Type } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { response } from 'src/app/classes/response';
import { ResponssesService } from 'src/app/services/responsses.service';
import { UnrespectfullWordsService } from 'src/app/services/unrespectfulWords/unrespectfull-words.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  @Input() recipyID: number = 0;
   /** ההפניה לקומפננטת הודעה למשתמש "*/
   modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(public userSer: UsersService,
    public resSer: ResponssesService,
    private unRespectSer:UnrespectfullWordsService,
    
    private modalService: MdbModalService,) {

  }

  ngOnInit(): void {
    debugger;
    this.GetReses();
  }

  GetReses(){
    setTimeout(()=> {this.resSer.GetAllOfPracticularRecipyById(this.recipyID).subscribe(
      (data: any) => {
        this.responses = data;
      },
      (err: Error) => { console.log(err); }
    )},1000);
  }


  //#region תגובות למתכון
  responses: Array<response> = [
    // new response(1, 25, 3, "aaa", "aaa", new Date("01-07-2012"), "זה נראה טעיםםםםםםםםםםםםם"),
    // new response(2, 25, 4, "aaa", "aaa", new Date("01-07-2012"), "זה נראה טעיםםםםםםםםםםםםם", 3),
    // new response(3, 25, 3, "aaa", "sda", new Date("01-07-2010"), "זה נראה טעיםםםםםםםםםםםםם"),
    // new response(4, 25, 6, "knk", "aaa", new Date("08-07-2012"), "זה נראה טעיםםםםםםםםםםםםם"),
    // new response(5, 25, 33, "aaa", "aaa", new Date("01-07-2012"), "זה נראה טעיםםםםםםםםםםםםם", 4),
    // new response(6, 25, 3, "lj", "aaa", new Date("01-09-2012"), "זה נראה טעיםםםםםםםםםםםםם", 3),
    // new response(7, 25, 7, "aaa", "aaa", new Date("03-07-2012"), "זה נראה טעיםםםםםםםםםםםםם"),
    // new response(8, 25, 3, "aaa", "aaa", new Date("01-07-2012"), "זה נראה טעיםםםםםםםםםםםםם"),

  ];

  resToRes:string = "";
  currentDate:Date = new Date();
  currentDateStr:string = this.currentDate.toDateString();
  
  
  onWantToResponse(id: string) {
    debugger
    if (!this.userSer.isLoged) {
      
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "רק משתמש רשום יכול לפרסם תגובה, הרשם עכשיו!" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });

    }
    else {
      this.resToAdd = "";
      // TODO לטפל בתגובה לתגובה
      this.toRes = Number.parseInt(id.replace("res",""));
  }
  }


  resToAdd:string = "";
  toRes:number = -1;
 
  /**
   * הוספת תגובה למתכון
   * @param resToAdd תגובה למתכון
   */
  onProve(resToAdd:string) {
    if (!this.userSer.isLoged) {
       
      //  ==== הודעה למשתמש ====
        this.modalRef = this.modalService.open(
          ModalComponent,//קומפוננטת ההודעה שתפתח
          {
            data: // ההודעה שתוצג למשתמש
              { title: "רק משתמש רשום יכול לפרסם תגובה, הרשם עכשיו!" },
            modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
          });
  
      return;

    }
    debugger;
    if(!this.unRespectSer.isRespectfulResponse(resToAdd))
      return;
    this.resSer.AddResponse(
      new response(0, this.recipyID, this.userSer.currentUser.userID, "", "", new Date(),resToAdd,this.toRes > 0? this.toRes :undefined, true)
    ).subscribe(
      (data: any) => {
        if (data > 0) {
          
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "תגובתך הועברה לביקורת אצל ההנהלה, נשתדל לפרסמה בהקדם, במידה וראויה לכך" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });
        
          //TODO לטפל שהינפוט יתנקה
        }
      },
      (err: Error) => { console.log(err);
      
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "המערכת נתקלה בבעיה. אנא נסה שנית מאוחר יותר" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });
}
    );
  }

  /**
   * הוספת תגובה לתגובה
   * @param resToAdd תגובה לתגובה
   */
  onProveToRes(resToAdd:string) {
   if(!this.unRespectSer.isRespectfulResponse(resToAdd))
      return;
    this.resSer.AddResponse(
      new response(0, this.recipyID, this.userSer.currentUser.userID, "", "", undefined,resToAdd,this.toRes > 0? this.toRes : undefined, true)
    ).subscribe(
      (data: any) => {
        if (data > 0) {
          
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: " לתגובה של " +this.toRes + " תגובתך הועברה לביקורת אצל ההנהלה, נשתדל לפרסמה בהקדם, במידה וראויה לכך" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });
        
          this.toRes = -1;
        }
      },
      (err: Error) => { console.log(err);
      
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "המערכת נתקלה בבעיה. אנא נסה שנית מאוחר יותר" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });
      }
    );
  }

  
  //#endregion








}
