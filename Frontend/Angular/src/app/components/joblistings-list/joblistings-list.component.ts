import { Component, OnInit } from '@angular/core';
import { Applicant } from 'src/app/models/applicant.model';
import { Joblisting } from 'src/app/models/joblisting.model';
import { Location } from 'src/app/models/location.model';
import { Position } from 'src/app/models/position.model';
import { Qualification } from 'src/app/models/qualification.model';
import { JoblistingService } from 'src/app/services/joblisting.service';
import { LocationService } from 'src/app/services/location.service';
import { PositionService } from 'src/app/services/position.service';
import { QualificationService } from 'src/app/services/qualification.service';

@Component({
  selector: 'app-joblistings-list',
  templateUrl: './joblistings-list.component.html',
  styleUrls: ['./joblistings-list.component.css']
})
export class JoblistingsListComponent implements OnInit {

  joblistings?: Joblisting[];
  applicants?: Applicant[];
  currentJoblisting: Joblisting = {};
  currentIndex = -1;
  name = '';

  joblistingsStatus = false;
  applicantsStatus = false;

  position: Position = { position: '' };
  qualification: Qualification = { qualification: '' };
  location: Location = { location: '' };

  constructor(
    private joblistingService: JoblistingService,
    private positionService: PositionService,
    private qualificationService: QualificationService,
    private locationService: LocationService,
    ) { }

  ngOnInit(): void {
    this.retrieveJoblistings();
  }

  retrieveJoblistings(): void {
    this.joblistingService.getAll()
      .subscribe({
        next: (data) => {
          this.joblistings = data;
        },
        error: (e) => console.error(e)
      });
  }

  getApplicantsByJoblistingId(id: string): void {
    this.joblistingService.findApplicantsByJoblistingId(id)
      .subscribe({
        next: (data) => {
          if(data.length > 0)
            this.applicantsStatus = true;
          else
            this.applicantsStatus = false;
          
          this.applicants = data;
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
    this.retrieveJoblistings();
    this.currentJoblisting = {};
    this.currentIndex = -1;
  }

  setActiveJoblisting(joblisting: Joblisting, index: number): void {
    this.currentJoblisting = joblisting;
    this.currentIndex = index;
    this.getApplicantsByJoblistingId(this.currentJoblisting.id);
    this.getPositionById(joblisting.positionId);
    this.getQualificationById(joblisting.desiredQualificationId);
    this.getLocationById(joblisting.locationId);
  }

  removeAllJoblistings(): void {
    this.joblistingService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
}