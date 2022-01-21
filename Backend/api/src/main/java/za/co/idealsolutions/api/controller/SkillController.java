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

import za.co.idealsolutions.api.model.Skill;
import za.co.idealsolutions.api.repository.SkillRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class SkillController {

  @Autowired
  SkillRepository skillRepository;

  @GetMapping("/skills")
  public ResponseEntity<List<Skill>> getAllSkills(@RequestParam(required = false) String skill) {
    try {
      List<Skill> skills = new ArrayList<Skill>();

      if (skill == null)
        skillRepository.findAll().forEach(skills::add);
      else
        skillRepository.findBySkill(skill).forEach(skills::add);

      if (skills.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(skills, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/skill/{id}")
  public ResponseEntity<Skill> getSkillById(@PathVariable("id") long id) {
    Optional<Skill> skillData = skillRepository.findById(id);

    if (skillData.isPresent()) {
      return new ResponseEntity<>(skillData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}