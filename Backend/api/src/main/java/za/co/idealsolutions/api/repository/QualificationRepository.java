package za.co.idealsolutions.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.Qualification;

public interface QualificationRepository extends JpaRepository<Qualification, Long> {
  List<Qualification> findByQualification(String qualification);
}
