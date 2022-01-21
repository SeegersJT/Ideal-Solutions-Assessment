package za.co.idealsolutions.api.repository;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.Applicant;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
// Extra findBy* is still needed
}