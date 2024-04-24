import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    this.loginService.onLogin(loginForm.value).subscribe(
      (response: any) => {
        console.log('login response-----:', response);
        this.userAuthService.setRoles(response.roles);
        this.userAuthService.setToken(response.token);
        this.userAuthService.setUsername(response.username);
        this.userAuthService.setEmail(response.email);

        const role = response.roles[0];

        
        if (role === 'ROLE_SUPER_ADMIN') {
          this.router.navigate(['/super-admin-dashboard']);

        } else if (role === 'ROLE_ADMIN'){
          this.router.navigate(['/admin-dashboard']);
        }else {
          this.router.navigate(['/login']);}
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
