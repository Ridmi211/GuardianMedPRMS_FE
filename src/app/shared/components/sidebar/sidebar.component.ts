import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router) {
    console.log("sdsdsdsdsd");

    this.checkSuperAdmin()
    this.checkAdmin()
  }


  logout() {
    this.userAuthService.clear()
    this.router.navigate(['login/']);
  }
  checkSuperAdmin() {
    const roles = this.userAuthService.getRoles();
    if (roles.includes('ROLE_SUPER_ADMIN')) {
      console.log(roles.includes('ROLE_SUPER_ADMIN'));

      this.isSuperAdmin = true;
    };
  }
  checkAdmin() {
    const roles = this.userAuthService.getRoles();
    if (roles.includes('ROLE_ADMIN')) {
      console.log(roles.includes('ROLE_ADMIN'));

      this.isAdmin = true;
    };
  }


}
