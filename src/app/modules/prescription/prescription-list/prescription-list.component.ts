import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { Prescription, State } from 'src/app/models/prescription';


@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  public prescription: Prescription[];
  requestedId: string;


  constructor(
    private userAuthService: UserAuthService,
    private prescriptionService: PrescriptionService,
    private router: Router
  ) {
    this.checkSuperAdmin()
    this.checkAdmin()
  }

  ngOnInit(): void {
    this.getPrescriptions();
  }

  public getPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe(
      (response: Prescription[]) => {
        this.prescription = response;


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  detailsPage(id) {

    this.router.navigate(['prescriptions/details/', id],);

  }

  updatePrescription(prescription: Prescription) {
    if (prescription.state === State.INACTIVE) {

      return;
    }
    this.router.navigate(['prescriptions/edit', prescription.id]);
  }


  search(value: string): void {
    this.prescriptionService.getPrescriptionByNIC(value).subscribe(
      (prescription: any) => {
        this.prescription = prescription as Prescription[];

      },
      (error: HttpErrorResponse) => {
        alert("No Prescriptions found for this patient");
      }
    );
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
          window.location.reload();
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


  isDeleteButtonEnabled(prescription: Prescription): boolean {
    const creationDate = new Date(prescription.date);
    const currentDate = new Date();
    const fiveYearsInMilliseconds = 5 * 365 * 24 * 60 * 60 * 1000; // 5 years in milliseconds
    return currentDate.getTime() - creationDate.getTime() >= fiveYearsInMilliseconds;
  }


}
