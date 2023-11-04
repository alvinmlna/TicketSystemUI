import { Injectable } from '@angular/core';
import { CurrentUser } from 'src/app/shared/shared/models/CurrentUser';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  constructor() { }

  savingUser(user : CurrentUser) {
    if(user) {
      localStorage.setItem("currentUser",JSON.stringify(user));
    }
  }

  getUser() : CurrentUser | null {
    var fromLocal = localStorage.getItem("currentUser");
    if(fromLocal) {
      return JSON.parse(fromLocal);
    }
    return null;
  }
  
  removeUser(){
    localStorage.removeItem("currentUser");
  }

  isAdmin(){
    var currentUser = this.getUser();
    if(currentUser && currentUser.roleId == "2")
      return true;

    return false;
  }

  isCustomer(){
    var currentUser = this.getUser();
    if(currentUser && currentUser.roleId == "1")
      return true;
      
    return false;
  }
}
