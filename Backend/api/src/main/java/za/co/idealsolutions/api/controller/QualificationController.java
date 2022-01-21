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

import za.co.idealsolutions.api.model.Qualification;
import za.co.idealsolutions.api.repository.QualificationRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class QualificationController {

  @Autowired
  QualificationRepository qualificationRepository;

  @GetMapping("/qualifications")
  public ResponseEntity<List<Qualification>> getAllQualifications(@RequestParam(required = false) String qualification) {
    try {
      List<Qualification> qualifications = new ArrayList<Qualification>();

      if (qualification == null)
        qualificationRepository.findAll().forEach(qualifications::add);
      else
        qualificationRepository.findByQualification(qualification).forEach(qualifications::add);

      if (qualifications.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(qualifications, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/qualification/{id}")
  public ResponseEntity<Qualification> getQualificationById(@PathVariable("id") long id) {
    Optional<Qualification> qualificationData = qualificationRepository.findById(id);

    if (qualificationData.isPresent()) {
      return new ResponseEntity<>(qualificationData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}