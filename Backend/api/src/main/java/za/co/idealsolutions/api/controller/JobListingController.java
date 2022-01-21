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

import za.co.idealsolutions.api.model.JobListing;
import za.co.idealsolutions.api.model.SkillMap;
import za.co.idealsolutions.api.repository.JobListingRepository;
import za.co.idealsolutions.api.repository.SkillMapRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class JobListingController {

  @Autowired
  JobListingRepository joblistingRepository;

  @Autowired
  SkillMapRepository skillMapRepository;

  @GetMapping("/joblistings")
  public ResponseEntity<List<JobListing>> getAllJobListings(@RequestParam(required = false) String joblisting, Long applicantId) {
    try {
      List<JobListing> joblistings = new ArrayList<JobListing>();

      if(applicantId != null){
        List<Long> applicantSkillIds = new ArrayList<Long>();
        Set<Long> jobIdsBySkills = new HashSet<Long>();

        List<SkillMap> jobsBySkills = new ArrayList<SkillMap>();
        List<SkillMap> applicantSkills = new ArrayList<SkillMap>();

        skillMapRepository.findByContextId(applicantId).forEach(applicantSkills::add);
        applicantSkills.removeIf(sm -> !sm.getContext().equals("applicant"));
        applicantSkills.forEach(sm -> applicantSkillIds.add(sm.getSkillId()));

        skillMapRepository.findByContext("joblisting").forEach(jobsBySkills::add);
        jobsBySkills.removeIf(sm -> !applicantSkillIds.contains(sm.getSkillId()));
        jobsBySkills.forEach(sm -> jobIdsBySkills.add(sm.getContextId()));

        joblistingRepository.findAllById(jobIdsBySkills).forEach(joblistings::add);
        return new ResponseEntity<>(joblistings, HttpStatus.OK);
      }

      if (joblisting == null)
        joblistingRepository.findAll().forEach(joblistings::add);

      if (joblistings.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(joblistings, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/joblisting/{id}")
  public ResponseEntity<JobListing> getJobListingById(@PathVariable("id") long id) {
    Optional<JobListing> joblistingData = joblistingRepository.findById(id);

    if (joblistingData.isPresent()) {
      return new ResponseEntity<>(joblistingData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/joblisting")
  public ResponseEntity<JobListing> createJobListing(@RequestBody JobListing joblisting) {
    try {
      JobListing _joblisting = joblistingRepository
          .save(new JobListing(
              joblisting.getCompanyName(),
              joblisting.getCompanyDescription(),
              joblisting.getPositionId(),
              joblisting.getPositionDescription(),
              joblisting.getDesiredQualificationId(),
              joblisting.getLocationId(),
              joblisting.getSalary()));
      return new ResponseEntity<>(_joblisting, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/joblisting/{id}")
  public ResponseEntity<JobListing> updateJobListing(@PathVariable("id") long id, @RequestBody JobListing joblisting) {
    Optional<JobListing> joblistingData = joblistingRepository.findById(id);

    if (joblistingData.isPresent()) {
      JobListing _joblisting = joblistingData.get();
      _joblisting.setCompanyName(joblisting.getCompanyName());
      _joblisting.setCompanyDescription(joblisting.getCompanyDescription());
      _joblisting.setPositionId(joblisting.getPositionId());
      _joblisting.setPositionDescription(joblisting.getPositionDescription());
      _joblisting.setDesiredQualificationId(joblisting.getDesiredQualificationId());
      _joblisting.setLocationId(joblisting.getLocationId());
      _joblisting.setSalary(joblisting.getSalary());
      return new ResponseEntity<>(joblistingRepository.save(_joblisting), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/joblisting/{id}")
  public ResponseEntity<HttpStatus> deleteJobListing(@PathVariable("id") long id) {
    try {
      joblistingRepository.deleteById(id);
      skillMapRepository.deleteByContextAndId("joblisting", id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/joblistings")
  public ResponseEntity<HttpStatus> deleteAllJobListings() {
    try {
      joblistingRepository.deleteAll();
      skillMapRepository.deleteByContext("joblisting");
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}