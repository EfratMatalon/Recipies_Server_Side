import { Injectable } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Injectable({
  providedIn: 'root'
})
export class UnrespectfullWordsService {

   /** ההפניה לקומפננטת המודל ההודעה "*/
   modalRef: MdbModalRef<ModalComponent> | null = null;
  wordsList:Array<string> = [
    ".*מגעיל.*",
    ".*דוחה*",
    ".*מחריד.*",
    ".*איום.*"
  ]
  constructor(
    private modalService: MdbModalService,) { }

  isRespectfulResponse(response: string){//: Observable<bool> {
    let r:RegExp;
    for (let index = 0; index < this.wordsList.length; index++) {
      const word = this.wordsList[index];    
      r = new RegExp(word,"igm")
      if(r.exec(response) != null){
        
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "== התגובה מכילה את המילה הלא ראויה \"" + word + "\" \n לא נוכל לפרסמה בניסוח זה" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });
        
        return false;
      }
    }
    return true;
  }
}
