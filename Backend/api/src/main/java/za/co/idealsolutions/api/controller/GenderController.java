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

import za.co.idealsolutions.api.model.Gender;
import za.co.idealsolutions.api.repository.GenderRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class GenderController {

  @Autowired
  GenderRepository genderRepository;

  @GetMapping("/genders")
  public ResponseEntity<List<Gender>> getAllGenders(@RequestParam(required = false) String gender) {
    try {
      List<Gender> genders = new ArrayList<Gender>();

      if (gender == null)
        genderRepository.findAll().forEach(genders::add);
      else
        genderRepository.findByGender(gender).forEach(genders::add);

      if (genders.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(genders, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/gender/{id}")
  public ResponseEntity<Gender> getGenderById(@PathVariable("id") long id) {
    Optional<Gender> genderData = genderRepository.findById(id);

    if (genderData.isPresent()) {
      return new ResponseEntity<>(genderData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}