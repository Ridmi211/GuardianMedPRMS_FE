import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User[];

  email = this.userAuthService.getEmail()
  username = this.userAuthService.getUsername()
  role = this.userAuthService.getRoles()

  constructor(

    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {

  }

}