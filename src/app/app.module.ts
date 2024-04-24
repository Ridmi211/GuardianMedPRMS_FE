import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
// import { PatientComponent } from './modules/patient/patient.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PatientListComponent } from './modules/patients/patient-list/patient-list.component';
// import{FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import{FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AddPrescriptionComponent } from './modules/prescription/add-prescription/add-prescription.component';
import { PrescriptionListComponent } from './modules/prescription/prescription-list/prescription-list.component';
import { ViewPrescriptionComponent } from './modules/prescription/view-prescription/view-prescription.component';
import { EditPrescriptionComponent } from './modules/prescription/edit-prescription/edit-prescription.component';
import { AddPatientComponent } from './modules/patients/add-patient/add-patient.component';
import { ViewPatientComponent } from './modules/patients/view-patient/view-patient.component';
import { ViewAdminsComponent } from './modules/admins/view-admins/view-admins.component';
import { AddAdminsComponent } from './modules/admins/add-admins/add-admins.component';
// import { ViewAdminComponent } from './modules/admins/view-admin/view-admin.component';
import { EditAdminComponent } from './modules/admins/edit-admin/edit-admin.component';
import { EditPatientsComponent } from './modules/patients/edit-patients/edit-patients.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AddBillsComponent } from './modules/bills/add-bills/add-bills.component';
import { ViewBillsComponent } from './modules/bills/view-bills/view-bills.component';
import { Patient } from './models/patient';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBillComponent } from './modules/bills/view-bill/view-bill.component';
import { AdminDashboardComponent } from './modules/dashboard/admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './modules/dashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminProfileComponent } from './modules/admins/admin-profile/admin-profile.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResetPasswordComponent } from './modules/admins/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    PatientListComponent,
    AddPrescriptionComponent,
    PrescriptionListComponent,
    ViewPrescriptionComponent,
    EditPrescriptionComponent,
    AddPatientComponent,
    ViewPatientComponent,
    ViewAdminsComponent,
    AddAdminsComponent,
    // ViewAdminComponent,
    EditAdminComponent,
    EditPatientsComponent,
    HeaderComponent,
    AddBillsComponent,
    ViewBillsComponent,
    ViewBillComponent,
    AdminDashboardComponent,
    SuperAdminDashboardComponent,
    AdminProfileComponent,
    ResetPasswordComponent,
    
    // PatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatTooltipModule, 
    ReactiveFormsModule,
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library:FaIconLibrary){
    // library.addIcons(faFilm);

  }
}
