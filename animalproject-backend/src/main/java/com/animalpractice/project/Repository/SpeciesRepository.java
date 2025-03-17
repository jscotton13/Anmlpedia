package com.animalpractice.project.Repository;

import com.animalpractice.project.Entity.Species;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpeciesRepository extends JpaRepository<Species, Long> {
    // Find species by group ID (this already exists)
    List<Species> findByGroup_Id(Long groupId);

    // Query to find species by group name (using group name directly)
    List<Species> findByGroupName(String name);
}
