import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { mainCategory } from '../classes/mainCategory';


@Injectable({
  providedIn: 'root'
})
export class MainCategoriesService {

  url: string = "http://localhost:58285/api/mainCategories";
  public mainCategories: Array<mainCategory> = [];
  
  constructor(public hc: HttpClient) {
    // debugger;
    this.GetAll().subscribe(
      (data: any) => { debugger;
        console.log("===============\n");
        
         this.mainCategories = data; },
      (err: Error) => { console.log(err); }
    ) }

  //קבלת כל כלי המדידה
  GetAll(): Observable<Array<mainCategory>> {
    return this.hc.get<Array<mainCategory>>(this.url);
  }
}
