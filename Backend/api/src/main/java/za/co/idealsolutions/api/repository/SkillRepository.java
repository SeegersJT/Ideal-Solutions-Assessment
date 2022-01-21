package za.co.idealsolutions.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.idealsolutions.api.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
  List<Skill> findBySkill(String skill);
}
