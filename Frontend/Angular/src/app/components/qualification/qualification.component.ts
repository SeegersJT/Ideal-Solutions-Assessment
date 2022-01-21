import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Qualification } from 'src/app/models/qualification.model';
import { QualificationService } from 'src/app/services/qualification.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {

  @Output() qualificationSelectedEvent = new EventEmitter<Qualification>();
  @Input() qualificationValue: Qualification = {qualification: ''};

  qualifications?: Qualification[];

  constructor(
    private qualificationService: QualificationService
  ) { }

  ngOnInit(): void {
    this.retrieveQualification();
  }

  retrieveQualification(): void {
    this.qualificationService.getAll()
      .subscribe({
        next: (data) => {
          this.qualifications = data;
        },
        error: (e) => console.error(e)
      });
  }

  sendQualification(qualification: Qualification){
    this.qualificationSelectedEvent.emit(qualification)
  }

}
