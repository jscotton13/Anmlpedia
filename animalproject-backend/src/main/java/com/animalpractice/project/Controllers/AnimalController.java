package com.animalpractice.project.Controllers;


import com.animalpractice.project.DTO.AnimalDto;
import com.animalpractice.project.Service.AnimalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/animal", produces = "application/json")
@Tag(name = "Animal Controller")
public class AnimalController {
    @Autowired
    private AnimalService animalService;

    // REST (GET): /api/animal
    @Operation(summary = "Get all animals", description = "Retrieves all animals")
    @GetMapping
    public ResponseEntity<List<AnimalDto>> getAllAnimals() {
        List<AnimalDto> animals = animalService.getAllAnimals();
        return ResponseEntity.ok(animals);
    }

    // REST (GET): /api/animal/{animalId}
    @Operation(summary = "Get an animal by ID", description = "Retrieves an animal by its ID")
    @GetMapping("/{animalId}")
    public ResponseEntity<AnimalDto> getAnimalById(@PathVariable Long animalId) {
        return ResponseEntity.ok(animalService.getAnimalById(animalId));
    }

    // REST (GET): /api/animal/species/{speciesId}
    @Operation(summary = "Get animals by Species ID", description = "Retrieves all animals that belong to the specified species")
    @GetMapping("/species/{speciesId}")
    public ResponseEntity<List<AnimalDto>> getAnimalsBySpeciesId(@PathVariable Long speciesId) {
        return ResponseEntity.ok(animalService.getAnimalBySpeciesId(speciesId));
    }

    // REST (GET): /api/animal/speciesname/{speciesName}
    @Operation(summary = "Get animals by Species Name", description = "Retrieves all animals that belong to the species with the given name")
    @GetMapping("/speciesname/{speciesName}")
    public ResponseEntity<List<AnimalDto>> getAnimalsBySpeciesName(@PathVariable String speciesName) {
        return ResponseEntity.ok(animalService.getAnimalBySpeciesName(speciesName));
    }

    // REST (POST): /api/animal
    @Operation(summary = "Add a new animal", description = "Creates and saves a new animal")
    @PostMapping
    public ResponseEntity<AnimalDto> addAnimal(@RequestBody AnimalDto animalDto) {
        AnimalDto savedAnimal = animalService.addAnimal(animalDto);
        return new ResponseEntity<>(savedAnimal, HttpStatus.CREATED);
    }

    // REST (PUT): /api/animal/{animalId}
    @Operation(summary = "Update an animal", description = "Updates an animal's details using its ID")
    @PutMapping("/{animalId}")
    public ResponseEntity<AnimalDto> updateAnimal(@PathVariable Long animalId, @RequestBody AnimalDto animalDto) {
        return ResponseEntity.ok(animalService.updateAnimal(animalDto, animalId));
    }

    // REST (DELETE): /api/animal/{animalId}
    @Operation(summary = "Delete an animal", description = "Deletes an animal using its ID")
    @DeleteMapping("/{animalId}")
    public ResponseEntity<String> deleteAnimal(@PathVariable Long animalId) {
        animalService.deleteAnimal(animalId);
        return ResponseEntity.ok("Animal deleted successfully!");
    }

}
