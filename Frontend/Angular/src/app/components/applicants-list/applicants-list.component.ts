import { Component, OnInit } from '@angular/core';
import { Applicant } from 'src/app/models/applicant.model';
import { Joblisting } from 'src/app/models/joblisting.model';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/gender.model';
import { GenderService } from 'src/app/services/gender.service';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/services/position.service';
import { Qualification } from 'src/app/models/qualification.model';
import { Location } from 'src/app/models/location.model';
import { QualificationService } from 'src/app/services/qualification.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css']
})
export class ApplicantsListComponent implements OnInit {

  applicants?: Applicant[];
  joblistings?: Joblisting[];
  currentApplicant: Applicant = {};
  currentIndex = -1;
  name = '';
  applicantsStatus = false;
  joblistingsStatus = false;

  gender: Gender = { gender: '' };
  position: Position = { position: '' };
  qualification: Qualification = { qualification: '' };
  location: Location = { location: '' };

  constructor(
    private applicantService: ApplicantService,
    private genderService: GenderService,
    private positionService: PositionService,
    private qualificationService: QualificationService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveApplicants();
  }

  retrieveApplicants(): void {
    this.applicantService.getAll()
      .subscribe({
        next: (data) => {
          this.applicants = data;
        },
        error: (e) => console.error(e)
      });
  }

  getJoblistingsByApplicantId(id: string): void {
    this.applicantService.findJoblistingByApplicantId(id)
      .subscribe({
        next: (data) => {
          if(data.length > 0)
            this.joblistingsStatus = true;
          else
            this.joblistingsStatus = false;
          
          this.joblistings = data;
        },
        error: (e) => console.error(e)
      });
  }

  getGenderById(id: any): void {
    this.genderService.get(id)
    .subscribe({
      next: (data) => {
        this.gender = data;
      },
      error: (e) => console.error(e)
    });
  }

  getPositionById(id: any): void {
    this.positionService.get(id)
    .subscribe({
      next: (data) => {
        this.position = data;
      },
      error: (e) => console.error(e)
    });
  }

  getQualificationById(id: any): void {
    this.qualificationService.get(id)
    .subscribe({
      next: (data) => {
        this.qualification = data;
      },
      error: (e) => console.error(e)
    });
  }

  getLocationById(id: any): void {
    this.locationService.get(id)
    .subscribe({
      next: (data) => {
        this.location = data;
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveApplicants();
    this.currentApplicant = {};
    this.currentIndex = -1;
  }

  setActiveApplicant(applicant: Applicant, index: number): void {
    this.currentApplicant = applicant;
    this.currentIndex = index;
    this.getJoblistingsByApplicantId(this.currentApplicant.id);
    this.getGenderById(applicant.genderId);
    this.getPositionById(applicant.positionId);
    this.getQualificationById(applicant.highestQualificationId);
    this.getLocationById(applicant.desiredLocationId);
  }

  removeAllApplicants(): void {
    this.applicantService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
}