package com.animalpractice.project.Service.Impl;

import com.animalpractice.project.DTO.AnimalDto;
import com.animalpractice.project.DTO.SpeciesDto;
import com.animalpractice.project.Entity.Animal;
import com.animalpractice.project.Entity.Species;
import com.animalpractice.project.Exceptions.ResourceNotFoundException;
import com.animalpractice.project.Repository.AnimalRepository;
import com.animalpractice.project.Repository.SpeciesRepository;
import com.animalpractice.project.Service.AnimalService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private SpeciesRepository speciesRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public AnimalDto getAnimalById(Long animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no animal found with the given id: "+ animalId));
        return modelMapper.map(animal, AnimalDto.class);
    }

    @Override
    public List<AnimalDto> getAnimalBySpeciesId(Long speciesId) {
        List<Animal> animalList = animalRepository.findBySpeciesId(speciesId);
        return animalList.stream()
                .map(animal -> modelMapper.map(animal, AnimalDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<AnimalDto> getAnimalBySpeciesName(String speciesName) {
        List<Animal> animalList = animalRepository.findBySpeciesName(speciesName);
        return animalList.stream().map(animal -> modelMapper.map(animal, AnimalDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<AnimalDto> getAllAnimals() {
        List<Animal> allAnimals = animalRepository.findAll();
        return allAnimals.stream().map((animal) -> modelMapper.map(animal, AnimalDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public AnimalDto addAnimal(AnimalDto animalDto) {
        Species species = speciesRepository.findById(animalDto.getSpecies().getId())
                .orElseThrow(() -> new ResourceNotFoundException("There is no species found with the given id: " + animalDto.getSpecies().getId()));
        Animal animal = modelMapper.map(animalDto, Animal.class);
        animal.setSpecies(species);
        Animal savedAnimal = animalRepository.save(animal);
        AnimalDto savedAnimalDto = modelMapper.map(savedAnimal, AnimalDto.class);
        savedAnimalDto.setSpecies(modelMapper.map(species, SpeciesDto.class));
        return savedAnimalDto;
    }

    @Override
    public AnimalDto updateAnimal(AnimalDto animalDto, Long animalId) {
        // Fetch the existing animal or throw an exception if not found
        Animal currentAnimal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no animal found with the given id: " + animalId));

        // If a new species is given, fetch it and update the animal
        if (animalDto.getSpecies() != null && animalDto.getSpecies().getId() != null) {
            Species newSpecies = speciesRepository.findById(animalDto.getSpecies().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("There is no species found with the given id: " + animalDto.getSpecies().getId()));
            currentAnimal.setSpecies(newSpecies);
        }

        // Update fields
        currentAnimal.setName(animalDto.getName());
        currentAnimal.setDesc(animalDto.getDesc());
        currentAnimal.setImgPath(animalDto.getImgPath());

        // Save the updated entity
        Animal updatedAnimal = animalRepository.save(currentAnimal);

        // Convert to DTO and include species data
        AnimalDto updatedAnimalDto = modelMapper.map(updatedAnimal, AnimalDto.class);
        updatedAnimalDto.setSpecies(modelMapper.map(currentAnimal.getSpecies(), SpeciesDto.class));

        return updatedAnimalDto;
    }

    @Override
    public void deleteAnimal(Long animalId) {
        Animal animalToDelete = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no species found with the given id: " + animalId));

        animalRepository.delete(animalToDelete);

        System.out.println("Animal with ID " + animalId + " has been deleted.");

    }
}
