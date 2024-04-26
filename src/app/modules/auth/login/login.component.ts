import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  otpMode: boolean = false;
  username: string = '';
  errorMessage: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private userAuthService: UserAuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  onLogin(loginForm: NgForm) {
    this.loginService.requestOTP(loginForm.value).subscribe(
      (response: any) => {
        console.log('OTP request response:', response);
        if (response.otpSent) {
          this.otpMode = true;
          this.username = loginForm.value.username;
          this.password = loginForm.value.password;
        } else {
          console.log(response.message);
        }
      },
      (error) => {
        console.log('Error requesting OTP:', error);
        this.toastr.error("Invalid login credentials", 'Error');
      }
    );
  }

  goBackLogin() {
    this.otpMode = false;
  }

  onVerifyOTP(otpForm: NgForm) {
    const otp = otpForm.value.otp;
    const otpData = { username: this.username, otp, password: this.password };

    this.loginService.verifyOTP(otpData).subscribe(
      (response: any) => {
        console.log('OTP verification response:', response);
        console.log('login response-----:', response);
        this.userAuthService.setRoles(response.roles);
        this.userAuthService.setToken(response.token);
        this.userAuthService.setUsername(response.username);
        this.userAuthService.setEmail(response.email);
        const role = response.roles[0];
        if (role === 'ROLE_SUPER_ADMIN') {
          this.router.navigate(['/super-admin-dashboard']);
        } else if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log('Error verifying OTP:', error);
        this.toastr.error('An error occurred during OTP verification. Please try again.', 'Error');
      }
    );
  }
}
