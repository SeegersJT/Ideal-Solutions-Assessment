package za.co.idealsolutions.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
  List<Location> findByLocation(String location);
}
