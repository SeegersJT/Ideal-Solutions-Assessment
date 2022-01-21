
import { Component, OnInit, ViewChildren } from '@angular/core';
import { Joblisting } from 'src/app/models/joblisting.model';
import { Location } from 'src/app/models/location.model';
import { Position } from 'src/app/models/position.model';
import { Qualification } from 'src/app/models/qualification.model';
import { Rating } from 'src/app/models/rating.model';
import { Skill } from 'src/app/models/skill.model';
import { JoblistingService } from 'src/app/services/joblisting.service';
import { SkillMapService } from 'src/app/services/skillmap.service';
import { SkillComponent } from '../skill/skill.component';

export class joblistingSkillMap{
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
  selector: 'app-add-joblisting',
  templateUrl: './add-joblisting.component.html',
  styleUrls: ['./add-joblisting.component.css'],
})
export class AddJoblistingComponent implements OnInit {

  joblisting: Joblisting = {
    companyName: '',
    companyDescription: '',
    positionId: 0,
    positionDescription: '',
    desiredQualificationId: 0,
    locationId: 0,
    salary: 0,
  };

  selectedPosition?: Position;
  selectedQualification?: Qualification;
  selectedLocation?: Location;
  selectedSkill?: Skill;
  selectedRating?: Rating;

  submitted = false;

  joblistingSkills: joblistingSkillMap[];

  @ViewChildren(SkillComponent) childen? : SkillComponent[];

  constructor(
    private joblistingService: JoblistingService,
    private skillMapService: SkillMapService
    ) {
      this.joblistingSkills = [];
    }

  ngOnInit(): void {
  }

  addJoblistingSkill(): void {
    if(!this.selectedSkill || !this.selectedRating) return
    this.joblistingSkills.push(new joblistingSkillMap(this.selectedSkill, this.selectedRating));
    this.selectedSkill = undefined;
    this.childen?.forEach(c => c.clearSelection());
  }

  removeJoblistingSkill($event: any): void {
    let skillId = $event.target.parentElement.getAttribute("data-skill") - 0;
    this.joblistingSkills = this.joblistingSkills.filter(s => s.skill?.id != skillId);
  }

  hasSelectedSkill = (skill?: Skill): boolean => {
    return !!this.joblistingSkills?.find(s => s.skill?.id == skill?.id);
  }

  saveJoblisting(): void {

    const data = {
      companyName: this.joblisting.companyName,
      companyDescription: this.joblisting.companyDescription,
      positionId: this.selectedPosition?.id,
      positionDescription: this.joblisting.positionDescription,
      desiredQualificationId: this.selectedQualification?.id,
      locationId: this.selectedLocation?.id,
      salary: this.joblisting.salary,
    };

    this.joblistingService.create(data)
      .subscribe({
        next: async (res) => {
          for(let i = 0; i < this.joblistingSkills.length; i++) {
            let as = this.joblistingSkills[i];
          
            await this.skillMapService.create({
              context: 'joblisting',
              contextId: res.id,
              skillId: as.skill?.id,
              ratingId: as.rating?.id
            })
          }
          this.joblistingSkills = [];
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newJoblisting(): void {
    this.submitted = false;
    this.joblisting = {
      companyName: '',
      companyDescription: '',
      positionId: 0,
      positionDescription: '',
      desiredQualificationId: 0,
      locationId: 0,
      salary: 0,
    };
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