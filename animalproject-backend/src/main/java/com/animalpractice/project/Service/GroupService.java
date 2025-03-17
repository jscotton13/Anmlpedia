package com.animalpractice.project.Service;

import com.animalpractice.project.DTO.GroupDto;

import java.util.List;
public interface GroupService {
    GroupDto addGroup(GroupDto groupDto);
    GroupDto getGroup(Long groupId);

    List<GroupDto> getAllGroups();
    GroupDto updateGroupById(GroupDto groupDto, Long groupId);
    List<GroupDto> getGroupsBySpeciesName(String speciesName);
    void deleteGroup(Long groupId);
}
