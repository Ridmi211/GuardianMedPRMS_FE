import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from 'src/app/core/services/bill.service';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {
  bill: Bill;
  userId: any;
  constructor(
    private route: ActivatedRoute,
    private billService: BillService,
    private router: Router
  ) {
    this.userId = this.router.getCurrentNavigation()?.extras?.state


  }

  ngOnInit(): void {

    if (this.userId?.uId) {
      this.billService.getBillById(this.userId.uId).subscribe(
        (bill: Object) => {
          this.bill = bill as Bill;

        },
        (error) => {

        }
      );


    }
    const id = this.route.snapshot.params['id'];

  }

  onBackClick() {
    this.router.navigate(['bills/list']);
  }


  public onDeleteBill(userId: string): void {
    if (confirm('Are you sure want to delete Bill?')) {
      this.billService.deleteBill(userId).subscribe(
        (response: void) => {

          this.billService.getBills();
          window.location.reload();
        },
        (HttpErrorResponse) => {
          alert('Bill Deleted');
          this.router.navigate(['bills/list']);
        }
      );
    }
  }

}
