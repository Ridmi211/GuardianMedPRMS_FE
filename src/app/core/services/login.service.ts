import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_PATH = 'http://localhost:8080';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService) { }


  public requestOTP(loginData: any) {
    return this.httpclient.post(this.API_PATH + '/api/auth/signin', loginData, {
      headers: this.requestHeader,
    });
  }

  public verifyOTP(otpData: any) {
    return this.httpclient.post(this.API_PATH + '/api/auth/verify-otp', otpData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    console.log("Checking role match...");
    const userRoles: string[] = this.userAuthService.getRoles();
    console.log("userRoles:", userRoles);
    if (userRoles && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        if (allowedRoles.includes(userRoles[i])) {
          console.log("Match found: ", userRoles[i]);
          return true;
        }
      }
    }
    console.log("No match found.");
    return false;
  }




}
