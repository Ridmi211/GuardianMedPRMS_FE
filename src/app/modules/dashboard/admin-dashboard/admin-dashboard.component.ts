import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { Prescription } from 'src/app/models/prescription';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public prescriptions: Prescription[]; // Updated variable name

  constructor(
    private router: Router,
    private prescriptionService: PrescriptionService
  ) { }

  ngOnInit(): void {
    this.getActivePrescriptions();
  }

  public getActivePrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe(
      (response: Prescription[]) => {
        this.prescriptions = response.filter(
          (prescription: Prescription) => prescription.state === 'ACTIVE'
        );
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  detailsPage(prescription: Prescription) {
    this.router.navigate(['bills/add'], { state: { prescription: prescription } });
  }
}
