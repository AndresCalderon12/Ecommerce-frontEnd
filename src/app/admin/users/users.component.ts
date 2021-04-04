import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;
  action: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const selectedUserId = params['uuid'];
        if (selectedUserId) {
          this.selectedUser = this.users.find(user => user.uuid === selectedUserId);
        }
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.users = response;
  }

  viewUser(uuid: number) {
    this.router.navigate(['admin','users'], {queryParams : {uuid, action: 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }
}