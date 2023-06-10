import { Component, OnInit } from '@angular/core';
import { ingredient } from 'src/app/classes/ingredient';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { MeasuresService } from 'src/app/services/measures.service';

@Component({
  selector: 'app-manage-ingridients',
  templateUrl: './manage-ingridients.component.html',
  styleUrls: ['./manage-ingridients.component.css']
})
export class ManageIngridientsComponent implements OnInit {

  strToSearch:string = "";
  constructor(public ingSer:IngredientsService,
    public meaSer:MeasuresService) { }

  ngOnInit(): void {
    window.scrollTo({behavior:"auto",top:0});
  }


}
