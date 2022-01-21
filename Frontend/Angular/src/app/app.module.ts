import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddApplicantComponent } from './components/add-applicant/add-applicant.component';
import { ApplicantDetailsComponent } from './components/applicant-details/applicant-details.component';
import { ApplicantsListComponent } from './components/applicants-list/applicants-list.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddJoblistingComponent } from './components/add-joblisting/add-joblisting.component';
import { JoblistingDetailsComponent } from './components/joblisting-details/joblisting-details.component';
import { GenderComponent } from './components/gender/gender.component';
import { LocationComponent } from './components/location/location.component';
import { PositionComponent } from './components/position/position.component';
import { QualificationComponent } from './components/qualification/qualification.component';
import { RatingComponent } from './components/rating/rating.component';
import { AddSkillmapComponent } from './components/add-skillmap/add-skillmap.component';
import { SkillmapDetailsComponent } from './components/skillmap-details/skillmap-details.component';
import { SkillmapListComponent } from './components/skillmap-list/skillmap-list.component';
import { SkillComponent } from './components/skill/skill.component';
import { JoblistingsListComponent } from './components/joblistings-list/joblistings-list.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddApplicantComponent,
    ApplicantDetailsComponent,
    ApplicantsListComponent,
    AddJoblistingComponent,
    JoblistingDetailsComponent,
    GenderComponent,
    LocationComponent,
    PositionComponent,
    QualificationComponent,
    RatingComponent,
    AddSkillmapComponent,
    SkillmapDetailsComponent,
    SkillmapListComponent,
    SkillComponent,
    JoblistingsListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
