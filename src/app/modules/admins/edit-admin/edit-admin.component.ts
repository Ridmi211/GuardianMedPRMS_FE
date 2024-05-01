import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  id: string;
  adminForm: FormGroup;
  resetForm: FormGroup;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.adminForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.adminService.getAdminById(this.id).subscribe(
      (response: any) => {
        this.adminForm.patchValue(response);
      },
      (error: any) => {
        alert("User not found")
      }
    );
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.adminService.updateAdmin(this.id, this.adminForm.value)
        .subscribe(
          (response) => {
            alert('User Updated');
            window.location.reload();
          },
          (error) => {
            alert("Failed to update user")
          }
        );
    }
  }

  onBackClick() {
    this.router.navigate(['admins/all']);
  }

  public isFieldInvalid(fieldName: string): boolean {
    const formControl = this.adminForm.controls[fieldName];
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

}
