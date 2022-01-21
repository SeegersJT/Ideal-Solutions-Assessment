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

import za.co.idealsolutions.api.model.Position;
import za.co.idealsolutions.api.repository.PositionRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class PositionController {

  @Autowired
  PositionRepository positionRepository;

  @GetMapping("/positions")
  public ResponseEntity<List<Position>> getAllPositions(@RequestParam(required = false) String position) {
    try {
      List<Position> positions = new ArrayList<Position>();

      if (position == null)
        positionRepository.findAll().forEach(positions::add);
      else
        positionRepository.findByPosition(position).forEach(positions::add);

      if (positions.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(positions, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/position/{id}")
  public ResponseEntity<Position> getPositionById(@PathVariable("id") long id) {
    Optional<Position> positionData = positionRepository.findById(id);

    if (positionData.isPresent()) {
      return new ResponseEntity<>(positionData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}