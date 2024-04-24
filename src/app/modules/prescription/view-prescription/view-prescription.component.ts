import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { Prescription } from 'src/app/models/prescription';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;

  prescription: Prescription;
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private userAuthService: UserAuthService,
    private prescriptionService: PrescriptionService,
    private router: Router
  ) {
    this.checkSuperAdmin()
    this.checkAdmin()
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('id', this.userId);

    if (this.userId) {
      this.prescriptionService.getPrescriptionById(this.userId).subscribe(
        (prescription: any) => {
          this.prescription = prescription as Prescription;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  updatePrescription(id: string) {
    this.router.navigate(['prescriptions/edit', id]);
  }

  onBackClick() {
    this.router.navigate(['prescriptions/list']);
  }

  public onDeletePrescription(userId: string): void {
    if (confirm('Are you sure want to delete prescription?')) {
      this.prescriptionService.deletePrescription(userId).subscribe(
        (response: void) => {
          this.prescriptionService.getPrescriptions();
          window.location.reload();
        },
        (HttpErrorResponse) => {
          alert('Prescription Deleted');
          this.router.navigate(['prescriptions/list']);
        }
      );
    }
  }


  checkSuperAdmin() {
    const roles = this.userAuthService.getRoles();
    if (roles.includes('ROLE_SUPER_ADMIN')) {
      console.log(roles.includes('ROLE_SUPER_ADMIN'));

      this.isSuperAdmin = true;
    };
  }
  checkAdmin() {
    const roles = this.userAuthService.getRoles();
    if (roles.includes('ROLE_ADMIN')) {
      console.log(roles.includes('ROLE_ADMIN'));

      this.isAdmin = true;
    };
  }
}
