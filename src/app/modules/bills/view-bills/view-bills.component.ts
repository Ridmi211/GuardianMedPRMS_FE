import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from 'src/app/core/services/bill.service';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
  public bill:Bill[];
  requestedID:string;

  constructor(
    private billService: BillService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getBills();
  }

  public getBills(): void {
    this.billService.getBills().subscribe(
      (response: Bill[]) => {
        this.bill = response;
        

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  detailsPage(id){
    console.log("Bill id",id);
    
    this.router.navigate(['bills/details/' ], {state: {uId:id}  })

    
  }

  search(value: string): void {
    this.billService.getBillById(value).subscribe(
      (bill: any) => {
        this.bill = [bill as Bill];// Wrap the response object in an array
        console.log("this.prescription........", this.bill);
      },
      (error: HttpErrorResponse) => {
        alert("No Bill found for this ID");
      }
    );
  }
  

  public onDeleteBill(userId: string): void {
    if (confirm('Are you sure want to delete Bill?')) {
      this.billService.deleteBill(userId).subscribe(
        (response: void) => {
          console.log(response);
          this.billService.getBills();
          window.location.reload();
        },
        (HttpErrorResponse) => {
          alert('Bill Deleted');
          window.location.reload();
        }
      );
    }
  }
  
}
