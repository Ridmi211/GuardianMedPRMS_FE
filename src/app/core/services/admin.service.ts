import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordResetRequest } from 'src/app/models/password-reset-request';
import { Patient } from 'src/app/models/patient';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_PATH = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public addAdmin(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_PATH}/api/auth/signup`, user);
  }

  public getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_PATH}/api/admin/all`);
  }

  getAdminById(id: String) {
    return this.http.get(`${this.API_PATH}/api/admin/${id}`);
  }
  getAdminByName(name: String) {
    return this.http.get(`${this.API_PATH}/api/admin/name/${name}`);
  }

  public updateAdmin(id: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.API_PATH}/api/admin/` + id,
      user
    );
  }

  public resetPassword(id: string, passwordResetRequest: PasswordResetRequest): Observable<PasswordResetRequest> {
    return this.http.put<PasswordResetRequest>(
      `${this.API_PATH}/api/admin/reset-password/` + id,
      passwordResetRequest
    );
  }

  public deleteAdminByUsername(username: string): Observable<void> {
    return this.http.delete<void>(`${this.API_PATH}/api/admin/delete/${username}`);
  }



}
