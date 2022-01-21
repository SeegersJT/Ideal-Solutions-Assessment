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
  currentQualificationId?: number;

  constructor(
    private qualificationService: QualificationService
  ) {
    setTimeout(() => {
      this.currentQualificationId = this.qualificationValue?.id;
    }, 50);
  }

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

  sendQualification(){
    let qualification = this.qualifications?.find(q => q.id == this.currentQualificationId);
    this.qualificationSelectedEvent.emit(qualification)
  }

}
