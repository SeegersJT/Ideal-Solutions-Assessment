package za.co.idealsolutions.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.JobListing;

public interface JobListingRepository extends JpaRepository<JobListing, Long> {
}