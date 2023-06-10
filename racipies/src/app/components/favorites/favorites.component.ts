import { Component, OnInit } from '@angular/core';
import { recipy } from 'src/app/classes/recipy';
import { RecipiesService } from 'src/app/services/recipies.service';
import { favorite } from 'src/app/classes/favorites';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  strToSearch: string = "";
  constructor(public resSer: RecipiesService,
    private router: Router,
    public userSer: UsersService,
    public favSer: FavoritesService) { }

  fevList: Array<favorite> = []

  ngOnInit(): void {
    window.scrollTo({behavior:"auto",top:0});

    this.favSer.GetAllOfPracticularUserById(this.userSer!.currentUser!.userID!).subscribe(
      (data: any) => {
        if (data != null) {
          debugger;
          this.fevList = data;
          console.log("=========== קבלנו את המועדפים של " + this.userSer.currentUser.firstName + " ============");

        }
      },
      (err: Error) => {
        console.error(err);
      }

    );
  }

  /**
 * פונקציה המעבירה לדף המלא של המתכון בעל הקוד שהתקבל
 * (בד"כ נקראת ע"י הלחיצה  על כרטיסיית המתכון)
 * @param recipyID 
 */
  fullResipy(recipyID: any) {
    this.router.navigate(
      ['/private', this.userSer.currentUser!.userID!, 'full', recipyID]);

  }

  deleteFev(dFevID: number) {
      debugger;
      this.favSer.delete(dFevID).subscribe(
        (data:any)=>{
          if(data>0){
            this.fevList = this.fevList!.filter(f=>f.fevID != dFevID)
            this.favSer.favoritesListForUser = this.favSer.favoritesListForUser!.filter(f=>f.fevID != dFevID)
            console.log("=========== נמחק בהצלחה ============");

          }
        },
        (err:Error) => {
          console.error(err);        
        }      
      )
  }
}
