package com.animalpractice.project.Repository;

import com.animalpractice.project.Entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("SELECT a FROM Animal a WHERE a.species.name = :speciesName")
    List<Animal> findBySpeciesName(@Param("speciesName") String speciesName);

    List<Animal> findBySpeciesId(Long speciesId);

    @Query("SELECT a FROM Animal a JOIN a.species s WHERE s.group.id = :groupId")
    List<Animal> findByGroupId(@Param("groupId") Long groupId);

}
