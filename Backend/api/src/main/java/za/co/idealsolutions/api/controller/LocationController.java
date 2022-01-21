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

import za.co.idealsolutions.api.model.Location;
import za.co.idealsolutions.api.repository.LocationRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class LocationController {

  @Autowired
  LocationRepository locationRepository;

  @GetMapping("/locations")
  public ResponseEntity<List<Location>> getAllLocations(@RequestParam(required = false) String location) {
    try {
      List<Location> locations = new ArrayList<Location>();

      if (location == null)
        locationRepository.findAll().forEach(locations::add);
      else
        locationRepository.findByLocation(location).forEach(locations::add);

      if (locations.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(locations, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/location/{id}")
  public ResponseEntity<Location> getLocationById(@PathVariable("id") long id) {
    Optional<Location> locationData = locationRepository.findById(id);

    if (locationData.isPresent()) {
      return new ResponseEntity<>(locationData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}