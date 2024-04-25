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
  otpMode: boolean = false;
  username: string = '';

  constructor(
    private loginService: LoginService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // onLogin(loginForm: NgForm) {
  //   this.loginService.requestOTP(loginForm.value).subscribe(
  //     (response: any) => {
  //       console.log('OTP request response:', response);
  //       // Switch to OTP mode
  //       this.otpMode = true;
  //       this.username = loginForm.value.username; // Store the username for OTP verification
  //     },
  //     (error) => {
  //       console.log('Error requesting OTP:', error);
  //     }
  //   );
  // }
  onLogin(loginForm: NgForm) {
    this.loginService.requestOTP(loginForm.value).subscribe(
      (response: any) => {
        console.log('OTP request response:', response);
        if (response.otpSent) {
          // OTP sent successfully, switch to OTP mode
          this.otpMode = true;
          this.username = loginForm.value.username;
        } else {
          // Handle case where OTP sending failed
          console.log(response.message); // Optional: Log additional message from the server
        }
      },
      (error) => {
        console.log('Error requesting OTP:', error);
      }
    );
  }

  goBackLogin() {    
          this.otpMode = false;      
  }
  
  onVerifyOTP(otpForm: NgForm) {
    const otp = otpForm.value.otp;
    const otpData = { username: this.username, otp };

    this.loginService.verifyOTP(otpData).subscribe(
      (response: any) => {
        console.log('OTP verification response:', response);
        // Handle successful OTP verification (e.g., store token, navigate to dashboard)
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
        // Handle OTP verification error
      }
    );
  }
}
