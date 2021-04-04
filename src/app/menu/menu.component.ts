import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user:string;
  constructor(public loginService:AuthenticationService) { }
  

  ngOnInit() {
    this.user = sessionStorage.getItem('username')

  }

}
