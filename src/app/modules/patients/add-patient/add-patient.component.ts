import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  addForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.addForm = this.formBuilder.group({
      patientNIC: ['', Validators.required],
      patientName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required]
    });
  }

  public onAddPatient(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.patientService.addPatient(this.addForm.value).subscribe(
      (response) => {
        console.log(response);
        this.patientService.getPatients();
        this.addForm.reset();
        alert('Patient added succesfully!');
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert('Patient with the same NIC exists');
      }
    );
  }

  public isFieldInvalid(fieldName: string): boolean {
    const formControl = this.addForm.controls[fieldName];
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
