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

  constructor(
    private loginService: LoginService,
    private userAuthService: UserAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  

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
        this.toastr.error("Invalid login credentials", 'Error');
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
        // if (response.success) {
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
      // }
      // else {
      //     console.log('Error verifying OTP:', response.message);
      //     // Set the error message to be displayed to the user
      //     this.errorMessage = response.message;
      //     this.toastr.error(response.message, 'Error');
      //   }
      },
      (error) => {
        console.log('Error verifying OTP:', error);
         this.toastr.error('An error occurred during OTP verification. Please try again.', 'Error');
        // Handle OTP verification error
      }
    );
  }
}
