import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Skill } from 'src/app/models/skill.model';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Output() skillSelectedEvent = new EventEmitter<Skill>();
  @Input() selectedSkill: ((skill?: Skill) => boolean) | undefined;
  
  skills?: Skill[];
  selectedValue?: string;
  
  constructor(
    private skillservice: SkillService
    ) { }
    
  ngOnInit(): void {
    this.retrieveSkills();
  }
  
  retrieveSkills(): void {
    this.skillservice.getAll()
    .subscribe({
      next: (data) => {
        this.skills = data;
      },
      error: (e) => console.error(e)
    });
  }
  
  sendSkill(skill: Skill){
    if(!skill){
      return
    }
    this.skillSelectedEvent.emit(skill);
  }
  
  clearSelection(){
    let t = this
    setTimeout(() => {
      t.selectedValue = undefined;
    }, 50);
  }

  @Output() clearSelector = this.clearSelection;

  getSkills(): Skill[] | undefined{
    if(typeof this.selectedSkill == "function"){
      return this.skills?.filter(s => { return !this.selectedSkill?.(s)})
    }
    return this.skills
  }

}
