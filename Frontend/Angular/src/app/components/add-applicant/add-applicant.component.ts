
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Applicant } from 'src/app/models/applicant.model';
import { Gender } from 'src/app/models/gender.model';
import { Location } from 'src/app/models/location.model';
import { Position } from 'src/app/models/position.model';
import { Qualification } from 'src/app/models/qualification.model';
import { Rating } from 'src/app/models/rating.model';
import { Skill } from 'src/app/models/skill.model';
import { ApplicantService } from 'src/app/services/applicant.service';
import { SkillMapService } from 'src/app/services/skillmap.service';
import { SkillComponent } from '../skill/skill.component';

export class applicantSkillMap{
  skill?: Skill;
  rating?: Rating;

  constructor(
    private _skill?: Skill,
    private _rating?: Rating
  ){
    this.skill = _skill;
    this.rating = _rating;
  }
}

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {

  applicant: Applicant = {
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

  selectedGender?: Gender;
  selectedPosition?: Position;
  selectedQualification?: Qualification;
  selectedLocation?: Location;
  selectedSkill?: Skill;
  selectedRating?: Rating;

  submitted = false;

  applicantSkills: applicantSkillMap[];

  @ViewChildren(SkillComponent) childen? : SkillComponent[];

  constructor(
    private applicantService: ApplicantService,
    private skillMapService: SkillMapService
    ) {
      this.applicantSkills = [];
    }

  ngOnInit(): void {}

  addApplicantSkill(): void {
    if(!this.selectedSkill || !this.selectedRating) return
    this.applicantSkills.push(new applicantSkillMap(this.selectedSkill, this.selectedRating));
    this.selectedSkill = undefined;
  }

  removeApplicantSkill($event: any): void {
    let skillId = $event.target.parentElement.getAttribute("data-skill") - 0;
    this.applicantSkills = this.applicantSkills.filter(s => s.skill?.id != skillId);
  }

  hasSelectedSkill = (skill?: Skill): boolean => {
    return !!this.applicantSkills?.find(s => s.skill?.id == skill?.id);
  }

  saveApplicant(): void {

    const data = {
      firstName: this.applicant.firstName,
      lastName: this.applicant.lastName,
      mobile: this.applicant.mobile,
      email: this.applicant.email,
      genderId: this.selectedGender?.id,
      positionId: this.selectedPosition?.id,
      highestQualificationId: this.selectedQualification?.id,
      desiredLocationId: this.selectedLocation?.id,
      salary: this.applicant.salary,
    };

    console.log(data);

    this.applicantService.create(data)
      .subscribe({
        next: async (res) => {
          for(let i = 0; i < this.applicantSkills.length; i++) {
            let as = this.applicantSkills[i];
          
            await this.skillMapService.create({
              context: 'applicant',
              contextId: res.id,
              skillId: as.skill?.id,
              ratingId: as.rating?.id
            })
          }
          this.applicantSkills = [];
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newApplicant(): void {
    this.submitted = false;
    this.applicant = {
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
  }

  receiveGenderSelectedEvent($event: Gender){
    this.selectedGender = $event;
  }

  receivePositionSelectedEvent($event: Position){
    this.selectedPosition = $event;
  }

  receiveQualificationSelectedEvent($event: Qualification){
    this.selectedQualification = $event;
  }

  receiveLocationSelectedEvent($event: Location){
    this.selectedLocation = $event;
  }

  receiveSkillSelectedEvent($event: Skill){
    this.selectedSkill = $event;
  }

  receiveRatingSelectedEvent($event: Rating){
    this.selectedRating = $event;
  }

}