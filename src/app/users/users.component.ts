import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { IUser } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  sub!: Subscription;
  users: IUser[] = [];
  errorMessage = '';
  /*
  user: User = {
    id: 1,
    name: 'Windstorm',
  };
  */
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.sub = this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  selectedUser?: IUser;
  onSelect(user: IUser): void {
    this.selectedUser = user;
  }
}
