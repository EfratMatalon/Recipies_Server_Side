import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from 'src/app/classes/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
  

    url: string = "http://localhost:58285/api/users";
    currentUser: user = {};
    isLoged: boolean = false;
    constructor(private hc: HttpClient) { }

    checkName(fName: string, lName: string): Observable<user> {
        return this.hc.get<user>(`${this.url}/check/${fName}/${lName}`);
    }

    GetUserByNameAndPassword(name: string, password: string): Observable<user> {
        return this.hc.get<user>(`${this.url}/${name}/${password}`);
    }

    AddUser(newRecord: user): Observable<number> {
        return this.hc.put<number>(this.url, newRecord);
    }

}
