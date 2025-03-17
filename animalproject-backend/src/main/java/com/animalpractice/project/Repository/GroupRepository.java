package com.animalpractice.project.Repository;

import com.animalpractice.project.Entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    // Query to find groups by a species' name using a join
   @Query("SELECT g FROM Group g JOIN g.speciesList s WHERE s.name = :speciesName")
   List<Group> findBySpeciesName(@Param("speciesName") String speciesName);
}
