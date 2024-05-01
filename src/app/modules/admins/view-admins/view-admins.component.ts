import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
@Component({
  selector: 'app-view-admins',
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.css']
})
export class ViewAdminsComponent implements OnInit {
  public user:User[];
  requestedID:string;

  constructor(
    private adminService: AdminService,
    private userAuthService:UserAuthService,
    private router:Router    
  ){ }

  ngOnInit(): void {
    this.getAdmins();
  }

  public getAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (response: User[]) => {
        this.user = response;       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateAdmin(id: string) {
    this.router.navigate(['admins/edit', id]);
  }

  resetPassword(id: string) {
    this.router.navigate(['admins/reset-password', id]);
  }

  search(value: string): void {
    this.adminService.getAdminByName(value).subscribe(
      (user: any) => {
        this.user = [user as User];
        
      },
      (error: HttpErrorResponse) => {
        alert("No Admin found for this Username");
      }
    );
  }
  
  public onDeleteAdmin(userId: string): void {
    if (confirm('Are you sure want to delete this Admin?')) {
      this.adminService.deleteAdminByUsername(userId).subscribe(
        (response: void) => {
          this.adminService.getAdmins();
          window.location.reload();
        },
        (HttpErrorResponse) => {
          alert('Admin Deleted');
          window.location.reload();
        }
      );
    }
  }
 
}
