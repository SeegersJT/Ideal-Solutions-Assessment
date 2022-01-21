package za.co.idealsolutions.api.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import za.co.idealsolutions.api.model.SkillMap;

public interface SkillMapRepository extends JpaRepository<SkillMap, Long> {

    @Query(value = "FROM SkillMap WHERE context = ?1")
    List<SkillMap> findByContext(String context);

    @Query(value = "FROM SkillMap WHERE contextId = ?1")
    List<SkillMap> findByContextId(long contextId);

    @Modifying
    @Query(value = "DELETE FROM SkillMap s WHERE s.contextId = :contextId AND s.context = :context")
    @Transactional
    void deleteByContextAndId(@Param("context") String context, @Param("contextId") long contextId);

    @Modifying
    @Query(value = "DELETE FROM SkillMap s WHERE s.context = :context")
    @Transactional
    void deleteByContext(@Param("context") String context);
}