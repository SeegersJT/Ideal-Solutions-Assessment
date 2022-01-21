import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicantsListComponent } from './components/applicants-list/applicants-list.component';
import { ApplicantDetailsComponent } from './components/applicant-details/applicant-details.component';
import { AddApplicantComponent } from './components/add-applicant/add-applicant.component';
import { JoblistingsListComponent } from './components/joblistings-list/joblistings-list.component';
import { JoblistingDetailsComponent } from './components/joblisting-details/joblisting-details.component';
import { AddJoblistingComponent } from './components/add-joblisting/add-joblisting.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'applicants', component: ApplicantsListComponent },
  { path: 'applicant/:id', component: ApplicantDetailsComponent },
  { path: 'add/applicant', component: AddApplicantComponent },
  { path: 'joblistings', component: JoblistingsListComponent },
  { path: 'joblisting/:id', component: JoblistingDetailsComponent },
  { path: 'add/joblisting', component: AddJoblistingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
