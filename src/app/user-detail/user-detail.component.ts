import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input() user?: IUser;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(() => this.goBack());
    }
  }
}
