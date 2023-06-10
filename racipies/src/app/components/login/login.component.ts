import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   /** ההפניה לקומפננטת מודאל הודעה למשתמש "*/
   modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(public userSer: UsersService,
               public router: Router,               
                private modalService: MdbModalService,) { }
 
ngOnInit(): void {
    window.scrollTo({behavior:"auto",top:0});
    debugger
    if (this.userSer.isLoged) {
      this.myForm.controls['fName'].setValue(this.userSer.currentUser.firstName + " " + this.userSer.currentUser.lastName)
      this.myForm.controls['pwd'].setValue(this.userSer.currentUser.password)
    }
    else
    document.getElementById("fName")!.focus();
  }

  myForm: FormGroup = new FormGroup(
    {
      "fName": new FormControl(null, [Validators.minLength(2), Validators.maxLength(20), Validators.pattern("[A-Za-zא-ת ]+[(1-9){1}A-Za-zא-ת ]*"), Validators.required]),
      "pwd": new FormControl(null, [Validators.minLength(4), Validators.maxLength(50), Validators.required]),

    });



  save() {
    if (this.userSer.isLoged) {
      this.userSer.isLoged = false;
      this.router.navigate(['home']);
    }
    else {
      // איפה בודקים אם זה המנהל?

      this.userSer.GetUserByNameAndPassword(this.getfName().value, this.getPwd().value).
        subscribe(
          (data: any) => {
            if (data != null) {
              //עבור כל משתמש רשום
              this.userSer.currentUser = data;
              debugger;
              this.userSer.isLoged = true;
              //אם זה המנהל
              if (data.firstName == "מערכת" && data.lastName == "food4U")
                this.router.navigate(['admin/IWantMakePeopleFillGood', data.userID, 'home']);
              else //אם זה משתמש רשום אחר
                this.router.navigate(['private', data.userID, 'home']);
            }
            else {
              this.modalRef = this.modalService.open( // פתיחת המודאל
                ModalComponent, // שם הקומפוננטה אותה נפתח כמודאל
                {
                  data: { title: "שם משתמש או סיסמא שגויים", ingredients: [] }, // המידע אותה נשלח לקומפוננטה כinput או params                 - איך שנקרא לזה
                  modalClass: "modal-xs" // עיצובים למודאל ולסגנון הפתיחה שלו
                });
            }
          },
          (err: Error) => { console.log(err); }
        );
    }
  }


  getfName() {
    return this.myForm.controls['fName'];
  }
  getPwd() {
    debugger;
    return this.myForm.controls['pwd'];
  }


}






