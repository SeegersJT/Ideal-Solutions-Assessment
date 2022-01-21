import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Output() locationSelectedEvent = new EventEmitter<Location>();
  @Input() locationValue: Location = {location: ''};

  locations?: Location[];
  currentLocationId?: number;

  constructor(
    private locationService: LocationService
  ) {
    setTimeout(() => {
      this.currentLocationId = this.locationValue.id;
    }, 50);
  }

  ngOnInit(): void {
    this.retrieveLocation();
  }

  retrieveLocation(): void {
    this.locationService.getAll()
      .subscribe({
        next: (data) => {
          this.locations = data;
        },
        error: (e) => console.error(e)
      });
  }

  sendLocation(){
    let location = this.locations?.find(l => l.id == this.currentLocationId);
    this.locationSelectedEvent.emit(location)
  }

}
