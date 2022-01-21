package za.co.idealsolutions.api.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import za.co.idealsolutions.api.model.Applicant;
import za.co.idealsolutions.api.model.SkillMap;
import za.co.idealsolutions.api.repository.ApplicantRepository;
import za.co.idealsolutions.api.repository.SkillMapRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ApplicantController {

  @Autowired
  ApplicantRepository applicantRepository;

  @Autowired
  SkillMapRepository skillMapRepository;

  @GetMapping("/applicants")
  public ResponseEntity<List<Applicant>> getAllApplicants(@RequestParam(required = false) String applicant, Long joblistingId) {
    try {
      List<Applicant> applicants = new ArrayList<Applicant>();

      if(joblistingId != null){
        List<Long> jobSkillIds = new ArrayList<Long>();
        Set<Long> applicantIdsBySkills = new HashSet<Long>();

        List<SkillMap> applicantBySkills = new ArrayList<SkillMap>();
        List<SkillMap> jobSkills = new ArrayList<SkillMap>();

        skillMapRepository.findByContextId(joblistingId).forEach(jobSkills::add);
        jobSkills.removeIf(sm -> !sm.getContext().equals("joblisting"));
        jobSkills.forEach(sm -> jobSkillIds.add(sm.getSkillId()));

        skillMapRepository.findByContext("applicant").forEach(applicantBySkills::add);
        applicantBySkills.removeIf(sm -> !jobSkillIds.contains(sm.getSkillId()));
        applicantBySkills.forEach(sm -> applicantIdsBySkills.add(sm.getContextId()));

        applicantRepository.findAllById(applicantIdsBySkills).forEach(applicants::add);
        return new ResponseEntity<>(applicants, HttpStatus.OK);
      }

      if (applicant == null)
        applicantRepository.findAll().forEach(applicants::add);

      if (applicants.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(applicants, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/applicant/{id}")
  public ResponseEntity<Applicant> getApplicantById(@PathVariable("id") long id) {
    Optional<Applicant> applicantData = applicantRepository.findById(id);

    if (applicantData.isPresent()) {
      return new ResponseEntity<>(applicantData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/applicant")
  public ResponseEntity<Applicant> createApplicant(@RequestBody Applicant applicant) {
    try {
      Applicant _applicant = applicantRepository
          .save(new Applicant(
              applicant.getFirstName(), 
              applicant.getLastName(),
              applicant.getMobile(),
              applicant.getEmail(),
              applicant.getGenderId(),
              applicant.getPositionId(),
              applicant.getHighestQualificationId(),
              applicant.getDesiredLocationId(),
              applicant.getSalary()));
      return new ResponseEntity<>(_applicant, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/applicant/{id}")
  public ResponseEntity<Applicant> updateApplicant(@PathVariable("id") long id, @RequestBody Applicant applicant) {
    Optional<Applicant> applicantData = applicantRepository.findById(id);

    if (applicantData.isPresent()) {
      Applicant _applicant = applicantData.get();
      _applicant.setFirstName(applicant.getFirstName());
      _applicant.setLastName(applicant.getLastName());
      _applicant.setMobile(applicant.getMobile());
      _applicant.setEmail(applicant.getEmail());
      _applicant.setGenderId(applicant.getGenderId());
      _applicant.setPositionId(applicant.getPositionId());
      _applicant.setHighestQualificationId(applicant.getHighestQualificationId());
      _applicant.setDesiredLocationId(applicant.getDesiredLocationId());
      _applicant.setSalary(applicant.getSalary());
      return new ResponseEntity<>(applicantRepository.save(_applicant), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/applicant/{id}")
  public ResponseEntity<HttpStatus> deleteApplicant(@PathVariable("id") long id) {
    try {
      applicantRepository.deleteById(id);
      skillMapRepository.deleteByContextAndId("applicant", id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/applicants")
  public ResponseEntity<HttpStatus> deleteAllApplicants() {
    try {
      skillMapRepository.deleteByContext("applicant");
      applicantRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}