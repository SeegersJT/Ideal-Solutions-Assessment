import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  @Output() positionSelectedEvent = new EventEmitter<Position>();
  @Input() positionValue: Position = {position: ''};

  positions?: Position[];

  constructor(
    private positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.retrievePositions();
  }

  retrievePositions(): void {
    this.positionService.getAll()
      .subscribe({
        next: (data) => {
          this.positions = data;
        },
        error: (e) => console.error(e)
      });
  }

  sendPosition(position: Position){
    this.positionSelectedEvent.emit(position)
  }

}
