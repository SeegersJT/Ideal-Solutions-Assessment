import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { JoblistingService } from 'src/app/services/joblisting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant } from 'src/app/models/applicant.model';
import { Joblisting } from 'src/app/models/joblisting.model';
import { Position } from 'src/app/models/position.model';
import { Qualification } from 'src/app/models/qualification.model';
import { Location } from 'src/app/models/location.model';
import { Rating } from 'src/app/models/rating.model';
import { Skillmap } from 'src/app/models/skillmap.model';
import { Skill } from 'src/app/models/skill.model';
import { SkillComponent } from '../skill/skill.component';
import { PositionService } from 'src/app/services/position.service';
import { QualificationService } from 'src/app/services/qualification.service';
import { LocationService } from 'src/app/services/location.service';
import { RatingService } from 'src/app/services/rating.service';
import { SkillMapService } from 'src/app/services/skillmap.service';
import { SkillService } from 'src/app/services/skill.service';
import { joblistingSkillMap } from '../add-joblisting/add-joblisting.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-joblisting-details',
  templateUrl: './joblisting-details.component.html',
  styleUrls: ['./joblisting-details.component.css']
})
export class JoblistingDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentJoblisting: Joblisting = {
    companyName: '',
    companyDescription: '',
    positionId: 0,
    positionDescription: '',
    desiredQualificationId: 0,
    locationId: 0,
    salary: 0,
  };
  @Input() applicants?: Applicant[];
  @Input() applicantsStatus?: boolean;
  @Input() position: Position = { position: '' };
  @Input() qualification: Qualification = { qualification: '' };
  @Input() location: Location = { location: '' };

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
  joblistingSkills: joblistingSkillMap[];

  @ViewChildren(SkillComponent) childen? : SkillComponent[];

  constructor(
    private joblistingService: JoblistingService,
    private route: ActivatedRoute,
    private positionService: PositionService,
    private qualificationService: QualificationService,
    private locationService: LocationService,
    private ratingService: RatingService,
    private skillMapService: SkillMapService,
    private skillService: SkillService,
    private router: Router) { 
      this.joblistingSkills = [];
      this.skillmaps = [];
     }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getJoblisting(this.route.snapshot.params["id"]);
      this.getAllRatings();
    }
  }

  async addJoblistingSkill(): Promise<void> {
    if(!this.selectedSkill || !this.selectedRating) return
    this.joblistingSkills.push(new joblistingSkillMap(this.selectedSkill, this.selectedRating));
    await this.skillMapService.create({
      context: 'joblisting',
      contextId: this.currentJoblisting.id,
      skillId: this.selectedSkill.id,
      ratingId: this.selectedRating.id
    })
    this.selectedSkill = undefined;
    this.childen?.forEach(c => c.clearSelection());
  }

  hasSelectedSkill = (skill?: Skill): boolean => {
    return !!this.joblistingSkills?.find(s => s.skill?.id == skill?.id);
  }

  removeJoblistingSkill($event: any): void {
    let skillId = $event.target.parentElement.getAttribute("data-skill") - 0;
    this.joblistingSkills = this.joblistingSkills.filter(s => s.skill?.id != skillId);

    let id = this.skillmaps.filter(a => a.skillId == skillId).find(i => i.id)
    this.skillMapService.delete(id?.id)
    .subscribe({
      next: (data) => {
      },
      error: (e) => console.error(e)
    });
  }

  getJoblisting(id: string): void {
    this.joblistingService.get(id)
      .subscribe({
        next: (data) => {
          this.currentJoblisting = data;
          this.getPositionById(this.currentJoblisting.positionId);
          this.getQualificationById(this.currentJoblisting.desiredQualificationId);
          this.getLocationById(this.currentJoblisting.locationId);
          this.getSkillMapsByContextId(id);
        },
        error: (e) => console.error(e)
      });
  }

  updateJoblisting(): void {
    this.message = '';

    this.joblistingService.update(this.currentJoblisting.id, this.currentJoblisting)
      .subscribe({
        next: async (res) => {
          this.message = res.message ? res.message : 'This joblisting was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteJoblisting(): void {
    this.joblistingService.delete(this.currentJoblisting.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/joblistings']);
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
    this.joblistingSkills = [];
    this.skillMapService.getByContextAndId("joblisting", id)
    .subscribe({
      next: (data) => {
        this.skillmaps = data;
        this.skillmaps.forEach((each, i) => {
          setTimeout(() => {
            this.skillService.get(each.skillId)
            .subscribe({
              next: (data) => {
                this.selectedSkill = data;
              },
              error: (e) => console.error(e)
            });

            this.ratingService.get(each.ratingId)
            .subscribe({
              next: (data) => {
                this.selectedRating = data;
              },
              error: (e) => console.error(e)
            });

            setTimeout(() => {
              this.joblistingSkills.push(new joblistingSkillMap(this.selectedSkill, this.selectedRating))
            }, 100);
          },i * 150);
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


  receivePositionSelectedEvent($event: Position){
    this.currentJoblisting.positionId = $event.id;
  }

  receiveQualificationSelectedEvent($event: Qualification){
    this.currentJoblisting.desiredQualificationId = $event.id;
  }

  receiveLocationSelectedEvent($event: Location){
    this.currentJoblisting.locationId = $event.id;
  }

  receiveSkillSelectedEvent($event: Skill){
    this.selectedSkill = $event;
  }

  receiveRatingSelectedEvent($event: Rating){
    this.selectedRating = $event;
  }
}
