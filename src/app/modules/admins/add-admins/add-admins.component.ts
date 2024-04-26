import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.css']
})
export class AddAdminsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public onAddAdmin(addForm: NgForm): void {
    if (addForm.invalid) {
      this.markFieldsAsTouched(addForm);
      return;
    }

    const rolesArray = Array.isArray(addForm.value.roles)
      ? addForm.value.roles
      : [addForm.value.roles];
    const payload = {
      ...addForm.value,
      roles: rolesArray
    };

    this.adminService.addAdmin(payload).subscribe(
      (response: User) => {
      
        this.adminService.getAdmins();
        addForm.reset();
        window.location.reload();
        alert("User added successfully");
      },
      (error: HttpErrorResponse) => {
        alert("Username or password already taken");
      }
    );
  }

  public isFieldInvalid(form: NgForm, fieldName: string): boolean {
    const control: FormControl = form.controls[fieldName] as FormControl;
    return control.invalid && (control.dirty || control.touched);
  }

  public markFieldsAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.controls[field] as FormControl;
      control.markAsTouched({ onlySelf: true });
    });
  }
}
