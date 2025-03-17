package com.animalpractice.project.Service.Impl;

import com.animalpractice.project.DTO.GroupDto;
import com.animalpractice.project.Entity.Group;
import com.animalpractice.project.Entity.Species;
import com.animalpractice.project.Exceptions.ResourceNotFoundException;
import com.animalpractice.project.Repository.GroupRepository;
import com.animalpractice.project.Repository.SpeciesRepository;
import com.animalpractice.project.Service.GroupService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private SpeciesRepository speciesRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public GroupDto addGroup(GroupDto groupDto) {
        //prevents setting an ID manually
        groupDto.setId(null);
        //converts GroupDto into Group JPA Entity
        Group group = modelMapper.map(groupDto, Group.class);
        //saves JPA entity into database
        Group savedGroup = groupRepository.save(group);
        //converts saved group JPA into GroupDto object
        return  modelMapper.map(savedGroup, GroupDto.class);
    }

    @Override
    public GroupDto getGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("There is no group found with the given id: " + groupId));
        return modelMapper.map(group, GroupDto.class);
    }

    @Override
    public List<GroupDto> getAllGroups() {
        List<Group> allGroups = groupRepository.findAll();
        //converts each Group entity into a GroupDto
        //stream() was used instead of a for-loop for efficiency
        return allGroups.stream().map((group) -> modelMapper.map(group, GroupDto.class))
                //collects each GroupDto entity into a list
                .collect(Collectors.toList());
    }

    @Override
    public GroupDto updateGroupById(GroupDto groupDto, Long groupId){
        Group currentGroup = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException(("There is no group with the given id: " + groupId)));

        currentGroup.setName(groupDto.getName());
        currentGroup.setDesc(groupDto.getDesc());
        currentGroup.setImgPath(groupDto.getImgPath());

        Group updatedGroup = groupRepository.save(currentGroup);

        //checks if updating any associated species needed
        if (groupDto.getName() != null && !groupDto.getName().equals(currentGroup.getName())) {
            //updates associated species if the group name has changed
            List<Species> speciesList = speciesRepository.findByGroup_Id(groupId);
            for (Species species : speciesList) {
                species.setGroup(updatedGroup);
                speciesRepository.save(species);  //saves the updated species
            }
        }

        // Convert updated group to GroupDto and return it
        return modelMapper.map(updatedGroup, GroupDto.class);
    }
    @Override
    public List<GroupDto> getGroupsBySpeciesName(String speciesName) {
        List<Group> groups = groupRepository.findBySpeciesName(speciesName);
        return groups.stream().map(group -> modelMapper.map(group, GroupDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteGroup(Long groupId) {
        Group groupToDelete = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException(("There is no group with the given id: " + groupId)));

        //checks for any species associated with the group before deletion
        List<Species> speciesList = speciesRepository.findByGroup_Id(groupId);
        for (Species species : speciesList) {
            species.setGroup(null);  //sets the group reference to null for orphaned species
            speciesRepository.save(species);
        }

        //then deletes
        groupRepository.delete(groupToDelete);

        //logs it
        System.out.println("Group with ID " + groupId + " has been deleted.");
    }
}
