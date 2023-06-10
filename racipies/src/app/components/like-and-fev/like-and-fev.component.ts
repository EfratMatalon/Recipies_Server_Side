import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { favorite } from 'src/app/classes/favorites';
import { Observable } from 'rxjs';
import { RecipiesService } from 'src/app/services/recipies.service';

@Component({
  selector: 'app-like-and-fev',
  templateUrl: './like-and-fev.component.html',
  styleUrls: ['./like-and-fev.component.css']
})
export class LikeAndFevComponent implements OnInit {

  @Input() recipyId: number | undefined;
  @Output() like = new EventEmitter();

  isLike: boolean = false;
  isFevo: boolean = false;
  favId: number | undefined;


  constructor(public userSer: UsersService,
    public fevSer: FavoritesService) { }

  ngOnInit(): void {
    debugger
    //אם בסשן זה עדיין לא טענו את רשימת המעודפים של המשתמש
    //if (this.fevSer.favoritesListForUser == undefined) 
    //טען אותה עכשיו
    let userId = this.userSer!.currentUser!.userID! == undefined? -1 : this.userSer!.currentUser!.userID!;
      this.fevSer.GetAllOfPracticularUserById(userId).subscribe(
        (data: any) => {
          this.fevSer.favoritesListForUser = data;
        },(err: Error) => {
          console.error(err);
        }
      );
      this.checkIsFevo()


      
  }

  onLike(){
    if(this.isLike)
      return;
    this.isLike = true;
    this.like.emit();
    
  }

  /**
   * 
      //בכל מקרה
      //חפש ברשימת המועדפים אם מתכון זה מסומן כמועדף, ואם כן לשים את הID שלו בfevId
   */
   checkIsFevo(){
    setTimeout(()=>{
      debugger
      let fav = this.fevSer.favoritesListForUser!
      .find(f=> f.recipyID == this.recipyId)
       this.favId = fav != undefined? fav!.fevID: -1;
      //אם קיים במועדפים - true, אחרת false
      console.log("===== " + this.isFevo + " ======= ");
      this.isFevo = fav != undefined;      
    },2000);}      
  



  addOrRemoveFav() {
    debugger
    console.log("==== " +this.recipyId);
    
    if (this.isFevo) {
      this.fevSer.delete(this.favId!).subscribe(
        (data: any) => {
          if (data > 0) {
            console.log("המתכון " + this.recipyId + " הוסר מהמועדפים של משתמש "
              + this.userSer.currentUser.userID);
          }
        },
        (err: Error) => { console.log(err); }
      );
    }
    else {
      this.fevSer.Add(
        {
          recipyID: this.recipyId,
          userID: this.userSer.currentUser.userID,
          personalNoteOrDescription: ""
        }).subscribe(
          (data: any) => {
            if (data > 0) {
              console.log("המתכון " + this.recipyId + " התוסף מהמועדפים של משתמש "
                + this.userSer.currentUser.userID);
              this.favId = data;
            }
          },
          (err: Error) => { console.log(err); }
        );
    }
    this.isFevo =! this.isFevo
  }

}
