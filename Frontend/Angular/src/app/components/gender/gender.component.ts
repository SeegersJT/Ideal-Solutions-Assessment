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
  currentGenderId?: number;

  constructor(
    private genderService: GenderService,
  ) {
    setTimeout(() => {
      this.currentGenderId = this.genderValue.id;
    }, 50);
  }

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

  sendGender(){
    let gender = <Gender> this.genders?.find(g => g.id == this.currentGenderId);
    this.genderSelectedEvent.emit(gender);
  }

}
