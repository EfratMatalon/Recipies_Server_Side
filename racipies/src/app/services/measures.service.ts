import { Injectable, OnInit } from '@angular/core';
import { measure } from '../classes/measure';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {


  url: string = "http://localhost:58285/api/measures";
  measures: Array<measure> | undefined;
  constructor(public hc: HttpClient) {
    
      this.GetAll().subscribe(
        (data: any) => { debugger; this.measures = data; },
        (err: Error) => { console.log(err); }
      )
    
  }



  //קבלת כל כלי המדידה
  GetAll(): Observable<Array<measure>> {
    return this.hc.get<Array<measure>>(this.url);
  }


}
