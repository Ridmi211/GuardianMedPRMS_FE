import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PrescriptionService } from 'src/app/core/services/prescription.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  patientCount: number;
  adminCount: number;
  prescriptionCount: number;

  constructor(
    private patientService: PatientService,
    private adminService: AdminService,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit() {
    this.getPatientCount();
    this.getAdminCount();
    this.getPrescriptionCount();
  }

  getPatientCount() {
    this.patientService.getPatients().subscribe(
      (patients) => {
        this.patientCount = patients.length;
      },
      (error) => {
        console.error('Failed to fetch patients:', error);
      }
    );
  }

  getAdminCount() {
    this.adminService.getAdmins().subscribe(
      (admins) => {
        this.adminCount = admins.length;
      },
      (error) => {
        console.error('Failed to fetch admins:', error);
      }
    );
  }

  getPrescriptionCount() {
    this.prescriptionService.getPrescriptions().subscribe(
      (prescriptions) => {
        this.prescriptionCount = prescriptions.length;
      },
      (error) => {
        console.error('Failed to fetch prescriptions:', error);
      }
    );
  }
}