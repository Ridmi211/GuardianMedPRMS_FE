import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { PatientListComponent } from './modules/patients/patient-list/patient-list.component';
import { AddPatientComponent } from './modules/patients/add-patient/add-patient.component';
import { ViewPatientComponent } from './modules/patients/view-patient/view-patient.component';
import { EditPatientsComponent } from './modules/patients/edit-patients/edit-patients.component';
import { AddPrescriptionComponent } from './modules/prescription/add-prescription/add-prescription.component';
import { EditPrescriptionComponent } from './modules/prescription/edit-prescription/edit-prescription.component';
import { ViewPrescriptionComponent } from './modules/prescription/view-prescription/view-prescription.component';
import { PrescriptionListComponent } from './modules/prescription/prescription-list/prescription-list.component';
import { ViewAdminsComponent } from './modules/admins/view-admins/view-admins.component';
import { AdminProfileComponent } from './modules/admins/admin-profile/admin-profile.component';
import { AddAdminsComponent } from './modules/admins/add-admins/add-admins.component';
import { EditAdminComponent } from './modules/admins/edit-admin/edit-admin.component';
import { ResetPasswordComponent } from './modules/admins/reset-password/reset-password.component';
import { AddBillsComponent } from './modules/bills/add-bills/add-bills.component';
import { ViewBillsComponent } from './modules/bills/view-bills/view-bills.component';
import { ViewBillComponent } from './modules/bills/view-bill/view-bill.component';
import { AdminDashboardComponent } from './modules/dashboard/admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './modules/dashboard/super-admin-dashboard/super-admin-dashboard.component'; 
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'patients/list', component: PatientListComponent , canActivate: [AuthGuard]},
  {path:'patients/add',component:AddPatientComponent , canActivate: [AuthGuard]},
  {path:'patients/details/:patientNIC',component:ViewPatientComponent , canActivate: [AuthGuard]},
  {path:'patients/edit/:patientNIC', component:EditPatientsComponent , canActivate: [AuthGuard]},
  { path: 'prescriptions/edit/:id', component: EditPrescriptionComponent , canActivate: [AuthGuard]},
  {path:'prescriptions/details/:id',component:ViewPrescriptionComponent , canActivate: [AuthGuard]},
  {path:'prescriptions/add', component: AddPrescriptionComponent  , canActivate: [AuthGuard]},
  {path:'prescriptions/list', component:PrescriptionListComponent , canActivate: [AuthGuard]},
  {path:'admins/profile', component:AdminProfileComponent , canActivate: [AuthGuard]},
  {path:'admins/all', component:ViewAdminsComponent , canActivate: [AuthGuard]} ,
  {path:'admins/add', component:AddAdminsComponent , canActivate: [AuthGuard]},
  {path:'admins/edit/:id', component:EditAdminComponent , canActivate: [AuthGuard]},
  {path:'admins/reset-password/:id', component:ResetPasswordComponent , canActivate: [AuthGuard]},
  {path:'bills/add', component:AddBillsComponent , canActivate: [AuthGuard]},
  {path:'bills/list', component:ViewBillsComponent , canActivate: [AuthGuard]},
  {path:'bills/details', component:ViewBillComponent , canActivate: [AuthGuard]},
  {path:'admin-dashboard',component:AdminDashboardComponent , canActivate: [AuthGuard]},
  {path:'super-admin-dashboard',component:SuperAdminDashboardComponent},
  { path:'**',redirectTo :'login'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
