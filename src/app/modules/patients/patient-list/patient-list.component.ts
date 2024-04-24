import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  public patient:Patient[];
  requestedNIC:string;
 isSuperAdmin:boolean = false;
  isAdmin:boolean = false;
  public hasPrescriptions: { [nic: string]: boolean } = {};

  constructor(
    private patientService: PatientService,
    private router:Router,
     private userAuthService:UserAuthService,
     private prescriptionService:PrescriptionService

  ){ this.checkSuperAdmin()
    this.checkAdmin()}

  ngOnInit(): void {
    this.getPatients();
  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this.patient = response;
        this.patient.forEach((patient) => {
          this.prescriptionService.getPrescriptionByNIC(patient.patientNIC).subscribe(
            (prescriptions: any) => {
              this.hasPrescriptions[patient.patientNIC] = prescriptions.length > 0;
            },
            (error: HttpErrorResponse) => {
              console.error(`Error fetching prescriptions for patient ${patient.patientNIC}:`, error);
            }
          );
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  detailsPage(patientNIC){
    console.log("id number",patientNIC);
    
    this.router.navigate(['patients/details/',patientNIC ], );

    
  }
  updatePatient(patientNIC: string) {
    this.router.navigate(['patients/edit', patientNIC]);
  }


  // search(value: string): void {
  //   this.patientService.getPatientByNIC(value).subscribe(
  //     (patient:any) => {
  //       this.patient = patient as Patient[];    
  //       console.log("this.prescription........",this.patient);
        
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert("No Patient found for this NIC");
  //     }
  //   );
  // }

  search(value: string): void {
    this.patientService.getPatientByNIC(value).subscribe(
      (patient: any) => {
        this.patient = [patient as Patient];// Wrap the response object in an array
        console.log("this.prescription........", this.patient);
      },
      (error: HttpErrorResponse) => {
        alert("No Patient found for this NIC");
      }
    );
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
