package com.animalpractice.project.Service.Impl;

import com.animalpractice.project.DTO.GroupDto;
import com.animalpractice.project.DTO.SpeciesDto;
import com.animalpractice.project.Entity.Animal;
import com.animalpractice.project.Entity.Group;
import com.animalpractice.project.Entity.Species;
import com.animalpractice.project.Exceptions.ResourceNotFoundException;
import com.animalpractice.project.Repository.AnimalRepository;
import com.animalpractice.project.Repository.GroupRepository;
import com.animalpractice.project.Repository.SpeciesRepository;
import com.animalpractice.project.Service.SpeciesService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SpeciesServiceImpl implements SpeciesService {

    @Autowired
    private SpeciesRepository speciesRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private ModelMapper modelMapper;

    //method to get species associated with a group ID
    @Override
    public List<SpeciesDto> getSpeciesByGroupId(Long groupId) {
        //fetches all species entities by groupId
        List<Species> speciesList = speciesRepository.findByGroup_Id(groupId);
        //maps each species entity into a speciesDto
        return speciesList.stream()
                .map(species -> modelMapper.map(species, SpeciesDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<SpeciesDto> getSpeciesByGroupName(String groupName) {
        List<Species> speciesList = speciesRepository.findByGroupName(groupName);
        return speciesList.stream().map(species -> modelMapper.map(species, SpeciesDto.class))
                .collect(Collectors.toList());
    }

    //method to get a species by its ID
    @Override
    public SpeciesDto getSpeciesBySpeciesId(Long speciesId) {
        Species species = speciesRepository.findById(speciesId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no species found with the given id: "+ speciesId));
        return modelMapper.map(species, SpeciesDto.class);
    }

    @Override
    public SpeciesDto addSpecies(SpeciesDto speciesDto) {
        Group group = groupRepository.findById(speciesDto.getGroup().getId())
                .orElseThrow(() -> new ResourceNotFoundException("There is no group found with the given id: " + speciesDto.getGroup().getId()));
        Species species = modelMapper.map(speciesDto, Species.class);
        species.setGroup(group); //sets the group association
        Species savedSpecies = speciesRepository.save(species);

        //converts back to a DTO before returning the group info
        SpeciesDto savedSpeciesDto = modelMapper.map(savedSpecies, SpeciesDto.class);
        savedSpeciesDto.setGroup(modelMapper.map(group, GroupDto.class));

        return savedSpeciesDto;
    }

    @Override
    public List<SpeciesDto> getAllSpecies() {
        List<Species> allSpecies = speciesRepository.findAll();
        //converts each Group entity into a GroupDto
        //stream() was used instead of a for-loop for efficiency
        return allSpecies.stream().map((species) -> modelMapper.map(species, SpeciesDto.class))
                //collects each GroupDto entity into a list
                .collect(Collectors.toList());
    }


    @Override
    public SpeciesDto updateSpecies(SpeciesDto speciesDto, Long speciesId) {
        Species currentSpecies = speciesRepository.findById(speciesId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no species found with the given id: " + speciesId));

        //if a new group is given, fetches it and updates the species
        if (speciesDto.getGroup() != null && speciesDto.getGroup().getId() != null){
            Group newGroup = groupRepository.findById(speciesDto.getGroup().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("There is no group found with the given id: " + speciesDto.getGroup().getId()));
            currentSpecies.setGroup(newGroup);
        }
        currentSpecies.setName(speciesDto.getName());
        currentSpecies.setDesc(speciesDto.getDesc());
        currentSpecies.setImgPath(speciesDto.getImgPath());

        Species updatedSpecies = speciesRepository.save(currentSpecies);

        //converts to DTO and includes group data
        SpeciesDto updatedSpeciesDto = modelMapper.map(updatedSpecies, SpeciesDto.class);
        updatedSpeciesDto.setGroup(modelMapper.map(currentSpecies.getGroup(), GroupDto.class));

        return updatedSpeciesDto;
    }

    //Former deleteSpecies
    /*@Override
    public void deleteSpecies(Long speciesId) {
        Species speciesToDelete = speciesRepository.findById(speciesId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no species found with the given id: " + speciesId));

        speciesRepository.delete(speciesToDelete);

        System.out.println("Species with ID " + speciesId + " has been deleted.");
    }*/

    //New deleteSpecies that ensures no issues occur with now orphaned animals
    @Override
    public void deleteSpecies(Long speciesId) {
        Species speciesToDelete = speciesRepository.findById(speciesId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no species found with the given id: " + speciesId));

        // Check for any animals associated with the species before deletion
        List<Animal> animalList = animalRepository.findBySpeciesId(speciesId);
        for (Animal animal : animalList) {
            animal.setSpecies(null); // Remove the species reference to avoid constraint issues
            animalRepository.save(animal);
        }

        // Delete the species
        speciesRepository.delete(speciesToDelete);

        // Log deletion
        System.out.println("Species with ID " + speciesId + " has been deleted.");
    }


}
