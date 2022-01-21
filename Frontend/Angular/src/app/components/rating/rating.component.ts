import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Rating } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Output() ratingSelectedEvent = new EventEmitter<Rating>();
  ratings?: Rating[];
  currentRatingId?: number;

  constructor(
    private ratingService: RatingService,
  ) { }

  ngOnInit(): void {
    this.retrieveRatings();
  }

  retrieveRatings(): void {
    this.ratingService.getAll()
      .subscribe({
        next: (data) => {
          this.ratings = data;
        },
        error: (e) => console.error(e)
      });
  }

  sendRating(){
    let rating = <Rating> this.ratings?.find(s => s.id == this.currentRatingId);
    this.ratingSelectedEvent.emit(rating);
  }

}