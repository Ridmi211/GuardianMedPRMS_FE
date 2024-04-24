import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { HttpErrorResponse } from '@angular/common/http';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { Prescription, State } from 'src/app/models/prescription';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  isSuperAdmin:boolean = false;
  isAdmin:boolean = false;
  patient: Patient;
  userId : any;
 prescription:Prescription[];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private userAuthService:UserAuthService,
    private prescriptionService: PrescriptionService,
    private router:Router
  ) {
    this.checkSuperAdmin()
    this.checkAdmin()
     }

   ngOnInit(): void {

    this.userId = this.route.snapshot.params['patientNIC'];
    console.log('patientNIC', this.userId);

    if (this.userId) {
      this.patientService.getPatientByNIC(this.userId).subscribe(
        (patient: any) => {
          this.patient = patient as Patient;
          console.log('res', this.patient);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }


    this.prescriptionService.getPrescriptionByNIC(this.userId).subscribe(
      (prescription:any) => {
        this.prescription = prescription as Prescription[];
        

      },
      (error: HttpErrorResponse) => {
        alert("No Prescriptions found for this patient");
      }
    );
  }

  updatePatient(patientNIC: string) {
    this.router.navigate(['patients/edit',patientNIC]);
  }


  onBackClick() {
    this.router.navigate(['patients/list']);
  }

  // public getPrescriptionByNIC(patientNIC): void {
 
  // }

  detailsPage(id){
    console.log("id number",id);
    
    this.router.navigate(['prescriptions/details/',id ], );

    
  }
  updatePrescription(prescription: Prescription) {
    if (prescription.state === State.INACTIVE) {
    
      return;
    }
    this.router.navigate(['prescriptions/edit', prescription.id]);
  }

  isDeleteButtonEnabled(prescription: Prescription): boolean {
    const creationDate = new Date(prescription.date);
    const currentDate = new Date();
    const fiveYearsInMilliseconds = 5 * 365 * 24 * 60 * 60 * 1000; // 5 years in milliseconds
    return currentDate.getTime() - creationDate.getTime() >= fiveYearsInMilliseconds;
  }
  
  public onDeletePatient(userId: string): void {
    if (confirm('Are you sure want to delete this patient')) {
      this.patientService.deletePatient(userId).subscribe(
        (response: void) => {
          console.log(response);
          this.patientService.getPatients();
          window.location.reload();
        },
        (HttpErrorResponse) => {
          alert('Patient Deleted');
          this.router.navigate(['patients/list'] );
        }
      );
    }
  }

  public onDeletePrescription(userId: string): void {
    if (confirm('Are you sure want to delete Prescription?')) {
      this.prescriptionService.deletePrescription(userId).subscribe(
        (response: void) => {
          console.log(response);
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
    if(roles.includes('ROLE_SUPER_ADMIN')){
      console.log(roles.includes('ROLE_SUPER_ADMIN'));
      
      this.isSuperAdmin = true;
    };
  }
  checkAdmin() {
    const roles = this.userAuthService.getRoles();
    if(roles.includes('ROLE_ADMIN')){
      console.log(roles.includes('ROLE_ADMIN'));
      
      this.isAdmin = true;
    };
  }

}
