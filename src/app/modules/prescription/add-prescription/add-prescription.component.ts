// Angular Component TypeScript
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Prescription, State } from 'src/app/models/prescription';
import { PrescriptionService } from 'src/app/core/services/prescription.service';
import { Patient } from 'src/app/models/patient';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  addForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private prescriptionService: PrescriptionService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.addForm = this.formBuilder.group({
      patientNIC: ['', Validators.required],
      doctorID: ['', Validators.required],
      doctorName: ['', Validators.required],
      patientName: ['', Validators.required],
      diagnosis: ['', Validators.required],
      medications: ['', Validators.required],
      instructions: ['', Validators.required]
    });
  }

  public onAddPrescription(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const medicationsInput = this.addForm.value.medications;
    const medicationsArray = medicationsInput.split(',').map(medication => medication.trim());

    const patient: Patient = {
      patientNIC: this.addForm.value.patientNIC,
      patientName: this.addForm.value.patientName,
      gender: this.addForm.value.gender,
      age: this.addForm.value.page,
      address: this.addForm.value.address,
      email: this.addForm.value.email,
      contactNumber: this.addForm.value.contactNumber
    };

    const prescription: Prescription = {
      id: 'a',
      patientNIC: this.addForm.value.patientNIC,
      doctorID: this.addForm.value.doctorID,
      doctorName: this.addForm.value.doctorName,
      patientName: this.addForm.value.patientName,
      date: this.addForm.value.date,
      diagnosis: this.addForm.value.diagnosis,
      medications: medicationsArray,
      instructions: this.addForm.value.instructions,
      state: State.ACTIVE,
      patient: patient
    };

    this.prescriptionService.addPrescription(prescription).subscribe(
      (response: Prescription) => {
        this.successMessage = 'Prescription added successfully.';
        this.prescriptionService.getPrescriptions();
        alert('Prescription added succfully!');
        this.addForm.reset();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.message === 'Patient not found') {
          this.errorMessage = 'Patient not found for the given patient NIC. Please register the patient first.';
        } else {
          alert('Failed to add prescription. ' + error.message);
        }
      }
    );
  }

  public isFieldInvalid(fieldName: string): boolean {
    const formControl = this.addForm.controls[fieldName];
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
