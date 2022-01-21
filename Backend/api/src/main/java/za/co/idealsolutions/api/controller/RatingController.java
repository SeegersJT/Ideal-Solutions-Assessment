package za.co.idealsolutions.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import za.co.idealsolutions.api.model.Rating;
import za.co.idealsolutions.api.repository.RatingRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class RatingController {

  @Autowired
  RatingRepository ratingRepository;

  @GetMapping("/ratings")
  public ResponseEntity<List<Rating>> getAllRatings(@RequestParam(required = false) String rating) {
    try {
      List<Rating> ratings = new ArrayList<Rating>();

      if (rating == null)
        ratingRepository.findAll().forEach(ratings::add);
      else
        ratingRepository.findByRating(rating).forEach(ratings::add);

      if (ratings.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(ratings, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/rating/{id}")
  public ResponseEntity<Rating> getRatingById(@PathVariable("id") long id) {
    Optional<Rating> ratingData = ratingRepository.findById(id);

    if (ratingData.isPresent()) {
      return new ResponseEntity<>(ratingData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}