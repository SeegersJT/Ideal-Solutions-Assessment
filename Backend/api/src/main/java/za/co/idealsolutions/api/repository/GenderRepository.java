package za.co.idealsolutions.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.Gender;

public interface GenderRepository extends JpaRepository<Gender, Long> {
  List<Gender> findByGender(String gender);
}
