import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../model/User';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../service/http-client.service';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  @Input()
  user: User

  @Output()
  userAddedEvent = new EventEmitter();

  newUser: User;
  message: string;
  password: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

    ngOnInit() {
      this.newUser = Object.assign({}, this.user);
  }
  addUser() {
    this.httpClientService.addUser(this.user).subscribe(
      (user) => {
        this.userAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
}
