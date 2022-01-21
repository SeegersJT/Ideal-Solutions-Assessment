import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gender } from 'src/app/models/gender.model';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  @Output() genderSelectedEvent = new EventEmitter<Gender>();
  @Input() genderValue: Gender = {gender: ''};
  
  genders?: Gender[];

  constructor(
    private genderService: GenderService,
  ) { }

  ngOnInit(): void {
    this.retrieveGenders();
  }

  retrieveGenders(): void {
    this.genderService.getAll()
      .subscribe({
        next: (data) => {
          this.genders = data;
        },
        error: (e) => console.error(e)
      });
  }

  sendGender(gender: Gender){
    this.genderSelectedEvent.emit(gender)
  }

}
