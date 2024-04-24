import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private API_PATH = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.API_PATH}/patients/all`);
  }

  public addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.API_PATH}/patients/add`, patient);
  }

  getPatientByNIC(patientNIC: String) {
    return this.http.get(`${this.API_PATH}/patients/byNIC/${patientNIC}`);
  }

  public updatePatient(patientNIC: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(
      `${this.API_PATH}/patients/update/${patientNIC}` ,
      patient
    );
  }

  public deletePatient(patientNIC: string): Observable<void> {
    return this.http.delete<void>(`${this.API_PATH}/patients/${patientNIC}`);
  }
 
}
