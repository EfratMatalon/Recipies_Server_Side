import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ingredientToAdd } from '../classes/ingredientToAdd';

@Injectable({
  providedIn: 'root'
})
export class RecomendsIngredientsService {

  url: string = "http://localhost:58285/api/ingredientsToAdd";

  constructor(public hc: HttpClient) { }

  
  GetAll(): Observable<Array<ingredientToAdd>> {
    return this.hc.get<Array<ingredientToAdd>>(this.url);
  }


  deleteById(id:number): Observable<Array<ingredientToAdd>> {
    // return this.hc.delete(`${this.url}/${id}`);
    return this.hc.get<Array<ingredientToAdd>>(this.url);

  }
}
