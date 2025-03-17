package com.animalpractice.project.Service;

import com.animalpractice.project.DTO.SpeciesDto;

import java.util.List;

public interface SpeciesService {

    List<SpeciesDto> getSpeciesByGroupId(Long groupId);
    List<SpeciesDto> getSpeciesByGroupName(String groupName);
    SpeciesDto getSpeciesBySpeciesId(Long speciesId);
    SpeciesDto addSpecies(SpeciesDto speciesDto);
    List<SpeciesDto> getAllSpecies();
    SpeciesDto updateSpecies(SpeciesDto speciesDto, Long speciesId);
    void deleteSpecies(Long speciesId);
}
