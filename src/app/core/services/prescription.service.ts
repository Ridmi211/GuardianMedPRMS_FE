import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from 'src/app/models/prescription';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private API_PATH = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.API_PATH}/prescription/all`);
  }
  public addPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.API_PATH}/prescription/add`, prescription);
  }
  getPrescriptionById(id: String) {
    return this.http.get(`${this.API_PATH}/prescription/byID/${id}`);
  }
  public updatePrescription(id: string, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(
      `${this.API_PATH}/prescription/update/` + id,
      prescription
    );
  }
  public deletePrescription(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_PATH}/prescription/${id}`);
  }
  getPrescriptionByNIC(patientNIC: String) {
    return this.http.get(`${this.API_PATH}/prescription/byNIC/${patientNIC}`);
  }

}
