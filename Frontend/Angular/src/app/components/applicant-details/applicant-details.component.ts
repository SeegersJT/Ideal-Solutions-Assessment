import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant } from 'src/app/models/applicant.model';
import { Joblisting } from 'src/app/models/joblisting.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/gender.model';
import { Position } from 'src/app/models/position.model';
import { Qualification } from 'src/app/models/qualification.model';
import { Location } from 'src/app/models/location.model';
import { PositionService } from 'src/app/services/position.service';
import { QualificationService } from 'src/app/services/qualification.service';
import { LocationService } from 'src/app/services/location.service';
import { Rating } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';
import { Skill } from 'src/app/models/skill.model';
import { SkillMapService } from 'src/app/services/skillmap.service';
import { Skillmap } from 'src/app/models/skillmap.model';
import { SkillService } from 'src/app/services/skill.service';
import { applicantSkillMap } from '../add-applicant/add-applicant.component';
import { SkillComponent } from '../skill/skill.component';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentApplicant: Applicant = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    genderId: 0,
    positionId: 0,
    highestQualificationId: 0,
    desiredLocationId: 0,
    salary: 0
  };
  @Input() joblistings?: Joblisting[];
  @Input() joblistingsStatus?: boolean;
  @Input() gender: Gender = { gender: '' };
  @Input() position: Position = { position: '' };
  @Input() qualification: Qualification = { qualification: '' };
  @Input() location: Location = { location: '' };

  genderSelect: Gender = {gender: ''}
  positionSelect: Position = {position: ''}
  qualificationSelect: Qualification = {qualification: ''}
  locationSelect: Location = {location: ''}

  message = '';

  ratingBadgeClasses: string[] = ['badge-secondary', 'badge-success', 'badge-primary', 'badge-warning', 'badge-danger', 'badge-info'];
  ratings?: Rating[];
  skillmaps: Skillmap[];
  skills?: Skill[];

  selectedSkill?: Skill;
  selectedRating?: Rating;
  applicantSkills: applicantSkillMap[];

  @ViewChildren(SkillComponent) childen? : SkillComponent[];

  constructor(
    private applicantService: ApplicantService,
    private genderService: GenderService,
    private positionService: PositionService,
    private qualificationService: QualificationService,
    private locationService: LocationService,
    private ratingService: RatingService,
    private skillMapService: SkillMapService,
    private skillService: SkillService,
    private route: ActivatedRoute,
    private router: Router) {
      this.applicantSkills = [];
      this.skillmaps = [];
     }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getApplicant(this.route.snapshot.params["id"]);
      this.getAllRatings();
    }
  }

 async addApplicantSkill(): Promise<void> {
    if(!this.selectedSkill || !this.selectedRating) return
    this.applicantSkills.push(new applicantSkillMap(this.selectedSkill, this.selectedRating));
    await this.skillMapService.create({
      context: 'applicant',
      contextId: this.currentApplicant.id,
      skillId: this.selectedSkill.id,
      ratingId: this.selectedRating.id
    })
    this.selectedSkill = undefined;
  }

  hasSelectedSkill = (skill?: Skill): boolean => {
    return !!this.applicantSkills?.find(s => s.skill?.id == skill?.id);
  }


  removeApplicantSkill($event: any): void {
    let skillId = $event.target.parentElement.getAttribute("data-skill") - 0;
    this.applicantSkills = this.applicantSkills.filter(s => s.skill?.id != skillId);

    let id = this.skillmaps.filter(a => a.skillId == skillId).find(i => i.id)
    this.skillMapService.delete(id?.id)
    .subscribe({
      next: (data) => {
      },
      error: (e) => console.error(e)
    });
  }

  getApplicant(id: string): void {
    this.applicantService.get(id)
      .subscribe({
        next: (data) => {
          this.currentApplicant = data;
          this.getGenderById(this.currentApplicant.genderId);
          this.getPositionById(this.currentApplicant.positionId);
          this.getQualificationById(this.currentApplicant.highestQualificationId);
          this.getLocationById(this.currentApplicant.desiredLocationId);
          this.getSkillMapsByContextId(id);
        },
        error: (e) => console.error(e)
      });
  }

  updateApplicant(): void {
    this.message = '';

    this.applicantService.update(this.currentApplicant.id, this.currentApplicant)
      .subscribe({
        next: async (res) => {
          this.message = res.message ? res.message : 'This applicant was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteApplicant(): void {
    this.applicantService.delete(this.currentApplicant.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/applicants']);
        },
        error: (e) => console.error(e)
      });
  }

  getGenderById(id: any): void {
    this.genderService.get(id)
    .subscribe({
      next: (data) => {
        this.genderSelect = data;
      },
      error: (e) => console.error(e)
    });
  }

  getPositionById(id: any): void {
    this.positionService.get(id)
    .subscribe({
      next: (data) => {
        this.positionSelect = data;
      },
      error: (e) => console.error(e)
    });
  }

  getQualificationById(id: any): void {
    this.qualificationService.get(id)
    .subscribe({
      next: (data) => {
        this.qualificationSelect = data;
      },
      error: (e) => console.error(e)
    });
  }

  getLocationById(id: any): void {
    this.locationService.get(id)
    .subscribe({
      next: (data) => {
        this.locationSelect = data;
      },
      error: (e) => console.error(e)
    });
  }

  getAllRatings(): void{
    this.ratingService.getAll()
    .subscribe({
      next: (data) => {
        this.ratings = data;
      },
      error: (e) => console.error(e)
    });
  }

  getSkillMapsByContextId(id: any): void{
    this.applicantSkills = [];
    this.skillMapService.getByContextAndId("applicant", id)
    .subscribe({
      next: (data) => {
        this.skillmaps = data;
        this.skillmaps.map(async sm => {
          let [skill, rating] = await Promise.all([
            new Promise(resolve => {
              this.skillService.get(sm.skillId).subscribe({next: resolve});
            }),
            new Promise(resolve => {
              this.ratingService.get(sm.ratingId).subscribe({next: resolve});
            })
          ]);
          this.applicantSkills.push(new applicantSkillMap(<Skill>skill, <Rating>rating))
        })
      },
      error: (e) => console.error(e)
    });
  }

  getSkillMapById(skillId: any, ratingId: any): void{
    this.skillService.get(skillId)
    .subscribe({
      next: (data) => {
        setTimeout(() => {
          this.selectedSkill = data;
        }, 100);
        
      },
      error: (e) => console.error(e)
    });

    this.ratingService.get(ratingId)
    .subscribe({
      next: (data) => {
        this.selectedRating = data;
      },
      error: (e) => console.error(e)
    });
  }

  receiveGenderSelectedEvent($event: Gender){
    this.currentApplicant.genderId = $event.id;
  }

  receivePositionSelectedEvent($event: Position){
    this.currentApplicant.positionId = $event.id;
  }

  receiveQualificationSelectedEvent($event: Qualification){
    this.currentApplicant.highestQualificationId = $event.id;
  }

  receiveLocationSelectedEvent($event: Location){
    this.currentApplicant.desiredLocationId = $event.id;
  }

  receiveSkillSelectedEvent($event: Skill){
    this.selectedSkill = $event;
  }

  receiveRatingSelectedEvent($event: Rating){
    this.selectedRating = $event;
  }
  
}
