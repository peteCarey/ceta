import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { IUser } from '../user';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  sub!: Subscription;
  selectedUser?: IUser;
  users: IUser[] = [];
  errorMessage = '';
  /*
  user: User = {
    id: 1,
    name: 'Windstorm',
  };
  */
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.sub = this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
        console.log(this.users[0].address);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onSelect(user: IUser): void {
    this.selectedUser = user;
    this.messageService.add(`UsersComponent: Selected user id=${user.id}`);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.userService.addUser({ name } as IUser).subscribe((user) => {
      this.users.push(user);
    });
  }

  delete(users: IUser): void {
    this.users = this.users.filter((h) => h !== users);
    this.userService.deleteUser(users.id).subscribe();
  }
}
