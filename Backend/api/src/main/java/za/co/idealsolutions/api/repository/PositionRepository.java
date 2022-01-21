package za.co.idealsolutions.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.Position;

public interface PositionRepository extends JpaRepository<Position, Long> {
  List<Position> findByPosition(String position);
}
