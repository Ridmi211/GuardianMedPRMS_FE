import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { Prescription } from 'src/app/models/prescription';

@Component({
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.component.html',
  styleUrls: ['./edit-prescription.component.css']
})
export class EditPrescriptionComponent implements OnInit {
  id: string;
  prescriptionForm: FormGroup;

  constructor(
    private router: Router,
    private prescriptionService: PrescriptionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.prescriptionForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      patientNIC: [{ value: '', disabled: true }],
      patientName: [{ value: '', disabled: true }],
      doctorID: [{ value: '', disabled: true }],
      doctorName: [{ value: '', disabled: true }],
      diagnosis: ['', Validators.required],
      medications: ['', Validators.required],
      instructions: ['', Validators.required]
    });

    this.prescriptionService.getPrescriptionById(this.id).subscribe(
      (response: any) => {
        this.prescriptionForm.patchValue(response);
      },
      (error: any) => {
        console.error(error);

      }
    );
  }

  onSubmit() {
    if (this.prescriptionForm.valid) {
      this.prescriptionService.updatePrescription(this.id, this.prescriptionForm.value)
        .subscribe(
          (response) => {

            alert('Prescription Updated');

            this.router.navigate(['prescriptions/details', this.id]);
          },
          (error) => {
            console.error(error);

          }
        );
    }
  }

  onBackClick() {
    this.router.navigate(['prescriptions/list']);
  }



  public isFieldInvalid(fieldName: string): boolean {
    const formControl = this.prescriptionForm.controls[fieldName];
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

}
