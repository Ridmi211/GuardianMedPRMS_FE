import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Prescription } from 'src/app/models/prescription';
import { Bill } from 'src/app/models/bill';
import { BillService } from 'src/app/core/services/bill.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.css']
})
export class AddBillsComponent implements OnInit {
   prescription: Prescription;
   medicationForm: FormGroup;
   medications: any[] = [];
   medicine:any[]=[];
   medicationObj

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private billService: BillService,
  ) {
    this.medicationForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.prescription = history.state.prescription;
    if (!this.prescription) {
       this.router.navigate(['prescription/list']);
    }
  }

  addMedication() {
    if (this.medicationForm) {
      const medication = {
        name: this.medicationForm.value.name,
        quantity: this.medicationForm.value.quantity,
        price: this.medicationForm.value.price,
        totalPrice: this.medicationForm.value.quantity * this.medicationForm.value.price
      };

      const medicine = {
        name: this.medicationForm.value.name,
        quantity: this.medicationForm.value.quantity,
        price: this.medicationForm.value.price,
      };

     
     

      this.medications.push(medication);
      
      this.medicine.push(medicine);
      this.medicationObj= {
        medications:this.medicine
     }


   

      this.medicationForm.reset();
     
    } else {
      alert('Please fill in all the required fields.');
    }
  }

  getTotalPayable(): number {
    let total = 0;
    this.medications.forEach((medication) => {
      total += medication.totalPrice;
    });
    return total;
  }


  onAddBill(medications: any): void {
    this.billService.addBills(medications, this.prescription.id ).subscribe(
      (response: Bill) => {
        this.billService.getBills();
         window.location.reload();
        alert("Bill added email sent Successfully");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  issueBill(): void {
   
  }

  public isFieldInvalid(fieldName: string): boolean {
    const formControl = this.medicationForm.controls[fieldName];
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
