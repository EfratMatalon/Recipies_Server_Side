import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { subCategory } from '../classes/category';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  
  url: string = "http://localhost:58285/api/categories";
  subCategories: Array<subCategory>|undefined;
  constructor(public hc: HttpClient) {
    this.GetAll().subscribe(
      (data: any) => { debugger; this.subCategories = data!
    .sort((a:any,b:any)=>a.categoryName.localeCompare(b.categoryName));
  },
      (err: Error) => { console.log(err); }
    ) }

  /** קבלת כל תתי הקטגוריות */ 
  GetAll(): Observable<Array<subCategory>> {
    return this.hc.get<Array<subCategory>>(this.url);
  }
}
