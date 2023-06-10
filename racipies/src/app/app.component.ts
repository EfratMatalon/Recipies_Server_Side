import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'racipies';





  color:any;
  logC(e:Event){
    console.table(e.target!);
    
  }


  constructor(private router: Router) {
    router.navigate(['']);// בעת ריענון תמיד ינווט לניתוב ברירת מחדל
  }
  
  

}
