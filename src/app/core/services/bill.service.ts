import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/models/bill';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private API_PATH = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.API_PATH}/bills/all`);
  }

  public addBills(bill: Bill, prescriptionID: string): Observable<Bill> {
    return this.http.post<Bill>(`${this.API_PATH}/bills/add/${prescriptionID}`, bill);
  }

  getBillById(id: String) {
    return this.http.get(`${this.API_PATH}/bills/byID/${id}`);
  }

  public deleteBill(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_PATH}/bills/${id}`);
  }


}
