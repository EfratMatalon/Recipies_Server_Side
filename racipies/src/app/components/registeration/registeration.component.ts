import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

   /** ההפניה לקומפננטת המודל  "*/
   modalRef: MdbModalRef<ModalComponent> | null = null;
  myForm: FormGroup = new FormGroup(
    {
      "fName": new FormControl(null, [Validators.minLength(2), Validators.maxLength(20), Validators.pattern("[A-Za-zא-ת]+[A-Z(1-9){1}a-zא-ת ]*"), Validators.required]),
      "lName": new FormControl(null, [Validators.minLength(2), Validators.maxLength(20), Validators.pattern("[A-Za-zא-ת]+[A-Z(1-9){1}a-zא-ת ]*")]),
      "pwd": new FormControl(null, [Validators.minLength(4), Validators.maxLength(50), Validators.required]),
      "pwdV": new FormControl(null, [this.isLikePwd.bind(this), Validators.required]),
      "email": new FormControl(null, [Validators.email]),
    });

  pwdToValid: string | undefined;
  constructor(public userSer: UsersService,
     public route: Router,     
    private modalService: MdbModalService,) { }

  //בדיקת תקינות
  isLikePwd(f: any) {
    if (f.value == this.pwdToValid)
      return null;
    return { "unValid-pwd": true };
  }



  getfName() {
    return this.myForm.controls['fName'];
  }
  getlName() {
    return this.myForm.controls['lName'];
  }
  getPwd() {
    return this.myForm.controls['pwd'];
  }
  getPwdV() {
    return this.myForm.controls['pwdV'];
  }
  getEmail() {
    return this.myForm.controls['email'];
  }

  save() {
    let uName = this.getfName().value + " " + this.getlName().value;
    let uPass = this.getPwd().value;
    
    //בדיקה אם לא קיים כבר משתמש בשם זהה
    this.userSer.checkName(this.getfName().value, this.getlName().value)
      .subscribe((data: any) => {
        if (data)
          
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "שם משתמש זה תפוס כבר, נא בחר שם אחר" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });
        
        else
          this.userSer.AddUser(
            new user(0, this.getfName().value, this.getlName().value, this.getEmail().value, this.getPwd().value)).subscribe(
              (data: any) => {
                if (data > 0) {
                  
      //  ==== הודעה למשתמש ====
      this.modalRef = this.modalService.open(
        ModalComponent,//קומפוננטת ההודעה שתפתח
        {
          data: // ההודעה שתוצג למשתמש
            { title: "נרשמת בהצלחה!!!, צוות Food4U מאחל לך הרבה הנאה בשימוש באתר" },
          modalClass: "modal-xs" //עיצוב המודאל ותורת הפתיחה
        });
("")
                  debugger
                  this.userSer.GetUserByNameAndPassword(uName, uPass).
                    subscribe(
                      (data: any) => {
                        if (data != null) {
                          debugger
                          this.userSer.currentUser = data;
                          this.userSer.isLoged = true;
                          this.route.navigate(['private', data.userID, 'home']);
                        }
                        else {
                          console.log("אינו רשום");
                        }
                      },
                      (err: Error) => { console.log(err); }
                    );
                }
              },
              (err: Error) => { console.log(err); }
            );
      });
  }

  ngOnInit(): void {
    window.scrollTo({behavior:"auto",top:0});
  }

}
