import { Component, OnInit } from '@angular/core';
import { recipy } from 'src/app/classes/recipy';
import { RecipiesService } from 'src/app/services/recipies.service';

@Component({
  selector: 'app-manage-recepies',
  templateUrl: './manage-recepies.component.html',
  styleUrls: ['./manage-recepies.component.css']
})
export class ManageRecepiesComponent implements OnInit {
  strToSearch:string = "";
  constructor(public resSer:RecipiesService) { }
  

  ngOnInit(): void {
    window.scrollTo({behavior:"auto",top:0});
  }

  deleteRecipy(Drecipy:recipy){
    debugger;
    this.resSer.deleteRecipy(Drecipy!.recipyID!).subscribe(
      (data:any)=>{
        if(data>0){

          this.resSer.recipiesList!.splice(this.resSer.recipiesList!.indexOf(Drecipy), 1);
          console.log("=========== נמחק בהצלחה ============");

        }
      },
      (err:Error) => {
        console.error(err);        
      }      
    )
  }


}
