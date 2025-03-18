package com.animalpractice.project.Controllers;


import com.animalpractice.project.DTO.SpeciesDto;
import com.animalpractice.project.Service.SpeciesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/species")
@Tag(name = "Species Controller") //swagger
public class SpeciesController {
    @Autowired
    private SpeciesService speciesService;

    //REST (GET): /api/species
    @Operation(summary = "Get all species", description = "Gets all species")
    @GetMapping
    public ResponseEntity<List<SpeciesDto>> getAllSpecies() {
        List<SpeciesDto> species = speciesService.getAllSpecies();
        return ResponseEntity.ok(species);
    }

    //REST (GET): /api/species/group/{groupId}
    @Operation(summary = "Get species by Group ID", description = "Gets species by Group ID")
    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<SpeciesDto>> getSpeciesByGroupId(@PathVariable Long groupId) {
        return ResponseEntity.ok(speciesService.getSpeciesByGroupId(groupId));
    }
    //REST (GET): /api/species/{speciesId}
    @Operation(summary = "Get species by its ID", description = "Gets species by its ID")
    @GetMapping("/{id}")
    public ResponseEntity<SpeciesDto> getSpeciesById(@PathVariable("id") Long speciesId) {
        return ResponseEntity.ok(speciesService.getSpeciesBySpeciesId(speciesId));
    }

    //REST (GET): /api/species/{groupName}
    @Operation(summary = "Get species by Group Name", description = "Gets all species that belong to the group with the specified name")
    @GetMapping("/{groupName}")
    public ResponseEntity<List<SpeciesDto>> getSpeciesByGroupName(@PathVariable String groupName) {
        return ResponseEntity.ok(speciesService.getSpeciesByGroupName(groupName));
    }
    // Add a new species
    @Operation(summary = "Add a new species", description = "Adds a new species")
    @PostMapping
    public ResponseEntity<SpeciesDto> addSpecies(@RequestBody SpeciesDto speciesDto) {
        SpeciesDto savedSpecies = speciesService.addSpecies(speciesDto);
        return new ResponseEntity<>(savedSpecies, HttpStatus.CREATED);
    }

    // Update an existing species
    @Operation(summary = "Update species", description = "Updates a species by using its id")
    @PutMapping("/{id}")
    public ResponseEntity<SpeciesDto> updateSpecies(@PathVariable("id") Long speciesId, @RequestBody SpeciesDto speciesDto) {
        return ResponseEntity.ok(speciesService.updateSpecies(speciesDto, speciesId));
    }

    // Delete a species by ID
    @Operation(summary = "Deletes a species", description = "Deletes a species by using its id")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSpecies(@PathVariable("id") Long speciesId) {
        speciesService.deleteSpecies(speciesId);
        return ResponseEntity.ok("Species deleted successfully!");
    }
}
