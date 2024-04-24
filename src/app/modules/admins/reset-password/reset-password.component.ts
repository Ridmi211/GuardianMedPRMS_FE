import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent  implements OnInit {
  id: string;
  // adminForm: FormGroup;
  resetForm: FormGroup;
  resetPassword:Subscription;
  @ViewChild('toaster') toasterRef :TemplateRef<any>

  constructor(
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.resetForm = this.formBuilder.group({
      previousPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    

    this.adminService.getAdminById(this.id).subscribe(
      (response: any) => {
        this.resetForm.patchValue(response); 
      },
      (error: any) => {
        console.error(error);
        
      }
    );
  }
 
  onReset() {
   
    if (this.resetForm.valid) {
     this.resetPassword=this.adminService.resetPassword(this.id, this.resetForm.value)
     .subscribe(
     
      (response) => {      
        alert("Updated");     
      },
      (error) => {
       
        alert("Password Updated Successfully!");
        this.resetForm.reset();

      },
  )
        
    }
  }

  onBackClick() {
    this.router.navigate(['admins/all']);
  }  

  public isFieldInvalid(fieldName: string): boolean {
    const formControl = this.resetForm.controls[fieldName];
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

}
