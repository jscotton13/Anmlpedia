package com.animalpractice.project.Service;

import com.animalpractice.project.DTO.AnimalDto;

import java.util.List;

public interface AnimalService {

    AnimalDto getAnimalById(Long animalId);
    List<AnimalDto> getAnimalBySpeciesId(Long speciesId);
    List<AnimalDto> getAnimalBySpeciesName(String speciesName);
    List<AnimalDto> getAllAnimals();

    AnimalDto addAnimal(AnimalDto animalDto);

    AnimalDto updateAnimal(AnimalDto animalDto, Long animalId);

    void deleteAnimal(Long animalId);
}
