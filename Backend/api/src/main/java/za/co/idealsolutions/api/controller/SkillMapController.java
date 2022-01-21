package za.co.idealsolutions.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import za.co.idealsolutions.api.model.SkillMap;
import za.co.idealsolutions.api.repository.SkillMapRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class SkillMapController {

  @Autowired
  SkillMapRepository skillmapRepository;

  @GetMapping("/skillmaps")
  public ResponseEntity<List<SkillMap>> getAllSkillMaps(@RequestParam(required = false) String context, Long contextId) {
    try {
      List<SkillMap> skillmaps = new ArrayList<SkillMap>();

      if (context == null && contextId == null)
        skillmapRepository.findAll().forEach(skillmaps::add);
      else if (contextId == null)
        skillmapRepository.findByContext(context).forEach(skillmaps::add);
      else if (context == null)
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      else {
        skillmapRepository.findByContext(context).forEach(skillmaps::add);
        skillmaps.removeIf(c -> c.getContextId() != contextId);
      }
      
      if (skillmaps.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(skillmaps, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/skillmap/{id}")
  public ResponseEntity<SkillMap> getSkillMapById(@PathVariable("id") long id) {
    Optional<SkillMap> skillmapData = skillmapRepository.findById(id);

    if (skillmapData.isPresent()) {
      return new ResponseEntity<>(skillmapData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/skillmap")
  public ResponseEntity<SkillMap> createSkillMap(@RequestBody SkillMap skillmap) {
    try {
      SkillMap _skillmap = skillmapRepository
        .save(new SkillMap(
            skillmap.getContext(),
            skillmap.getContextId(),
            skillmap.getSkillId(),
            skillmap.getRatingId()));
      return new ResponseEntity<>(_skillmap, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/skillmap/{id}")
  public ResponseEntity<SkillMap> updateSkillMap(@PathVariable("id") long id, @RequestBody SkillMap skillmap) {
    Optional<SkillMap> skillmapData = skillmapRepository.findById(id);

    if (skillmapData.isPresent()) {
      SkillMap _skillmap = skillmapData.get();
      _skillmap.setContext(skillmap.getContext());
      _skillmap.setContextId(skillmap.getContextId());
      _skillmap.setSkillId(skillmap.getSkillId());
      _skillmap.setRatingId(skillmap.getRatingId());
      return new ResponseEntity<>(skillmapRepository.save(_skillmap), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/skillmap/{id}")
  public ResponseEntity<HttpStatus> deleteSkillMap(@PathVariable("id") long id) {
    try {
      skillmapRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/skillmaps")
  public ResponseEntity<HttpStatus> deleteAllSkillMaps() {
    try {
      skillmapRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}