import { Component, OnInit } from '@angular/core';
import { response } from 'src/app/classes/response';
import { ResponssesService } from 'src/app/services/responsses.service';

@Component({
  selector: 'app-manage-responses',
  templateUrl: './manage-responses.component.html',
  styleUrls: ['./manage-responses.component.css']
})
export class ManageResponsesComponent implements OnInit {
  unProvedResponses:Array<response> = [];
  constructor(private respSer:ResponssesService) { }

  ngOnInit(): void {
    this.respSer.GetAllNotApprovedResponse().subscribe(
      (data:any)=>{
        this.unProvedResponses = data
        window.scrollTo({behavior:"auto",top:0});},
        (err:Error)=>{
          console.log(err);
          
        }
    );
  }

}
