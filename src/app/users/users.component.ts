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
  id = 10;
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
    /*  this.sub = this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
        console.log(this.users[0].address);
      },
      error: (err) => (this.errorMessage = err),
    });*/
    this.getUsers();
  }

  onSelect(user: IUser): void {
    this.selectedUser = user;
    this.messageService.add(`UsersComponent: Selected user id=${user.id}`);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  add(
    //id: number,
    name: string,
    username: string,
    email: string,
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    lat: string,
    lng: string,
    phone: string,
    website: string,
    company: string
  ): void {
    // add({id,name,username, email}): void {
    debugger;
    name = name.trim();
    if (!name) {
      return;
    }
    /*  this.userService.addUser({ name } as IUser).subscribe((user) => {
      debugger;
      console.log(user);
      this.users.push(user);
  */
    this.id = this.id + 1;
    this.users.push({
      id: this.id,
      name: name,
      username: username,
      email: email,
      address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipcode,
        geo: {
          lat: lat,
          lng: lng,
        },
      },
      phone: phone,
      website: website,
      company: {
        _name: '',
        catchPhrase: '',
        bs: '',
      },
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: undefined,
      lat: '',
      lng: '',
      _name: '',
      catchPhrase: '',
      bs: '',
    });
    console.log('test ' + JSON.stringify(this.users));
    // this.getUsers();*/
    //   });
    //  });
  }
  delete(users: IUser): void {
    this.users = this.users.filter((h) => h !== users);
    this.userService.deleteUser(users.id).subscribe();
    console.log(this.users);
  }
}
