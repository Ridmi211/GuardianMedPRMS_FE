import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-edit-patients',
  templateUrl: './edit-patients.component.html',
  styleUrls: ['./edit-patients.component.css']
})
export class EditPatientsComponent implements OnInit {
  patientNIC: string;
  patientForm: FormGroup;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.patientNIC = this.route.snapshot.params['patientNIC'];
    this.patientForm = this.formBuilder.group({
      patientNIC: ['', Validators.required],
      patientName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required]
    });

    this.patientService.getPatientByNIC(this.patientNIC).subscribe(
      (response: any) => {
        this.patientForm.patchValue(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.updatePatient(this.patientNIC, this.patientForm.value).subscribe(
        (response) => {
          console.log(response);
          alert('Updated');
          this.router.navigate(['patients/details', this.patientNIC]);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.patientForm.markAllAsTouched();
    }
  }

  onBackClick() {
    this.router.navigate(['patients/list']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.patientForm.controls[fieldName];
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
