import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: Array<User>;
  autenticated:boolean;
  constructor(private httpClientService: HttpClientService,
   ) {

    }

  authenticate(username, password) {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    for (let index = 0; index < this.users.length; index++) {
      if (username ===this.users[index].name && password ===this.users[index].password) {
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('userType',this.users[index].type);
        this.autenticated=true;
        break;
      } else {
        this.autenticated=false;
      }
      
    }
    return this.autenticated;
   
  

  }
  isAdmin(){
    let userType = sessionStorage.getItem('userType')
    if (userType==="admin") {
      return true;
    }else{
      return false
    }
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userType')

  }
  handleSuccessfulResponse(response) {
    this.users = response;
  }
}
