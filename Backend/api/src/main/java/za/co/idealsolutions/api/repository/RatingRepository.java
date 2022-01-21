package za.co.idealsolutions.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long> {
  List<Rating> findByRating(String rating);
}
