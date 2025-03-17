package com.animalpractice.project.Controllers;


import com.animalpractice.project.DTO.GroupDto;
import com.animalpractice.project.Service.GroupService;
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
@RequestMapping(value = "/api/group", produces = "application/json")
@Tag(name = "Group Controller") //swagger
public class GroupController {
    @Autowired
    private GroupService groupService;
    //REST (POST): /api/group
    @Operation(summary = "Add a new group", description = "Creates a new group and stores it in the database")
    @PostMapping
    public ResponseEntity<GroupDto> addGroup(@RequestBody GroupDto groupDto){
        GroupDto savedGroup = groupService.addGroup(groupDto);
        return new ResponseEntity<>(savedGroup, HttpStatus.CREATED);
    }

    //REST (GET): /api/group/{id}
    @Operation(summary = "Get a group", description = "Gets a group by using it's id")
    @GetMapping("/{id}")
    public ResponseEntity<GroupDto> getGroup(@PathVariable("id") Long groupId){
        GroupDto groupDto = groupService.getGroup(groupId);
        return ResponseEntity.ok(groupDto);
    }

    //REST (GET): /api/group
    @Operation(summary = "Get all groups", description = "Gets all group")
    @GetMapping
    public ResponseEntity<List<GroupDto>> getAllGroups(){
        List<GroupDto> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }

    //REST (GET): /api/group/species/{speciesName}
    @Operation(summary = "Get groups by species name", description = "Gets all groups that contain a species with the given name")
    @GetMapping("/species/{speciesName}")
    public ResponseEntity<List<GroupDto>> getGroupsBySpeciesName(@PathVariable("speciesName") String speciesName) {
        List<GroupDto> groups = groupService.getGroupsBySpeciesName(speciesName);
        return ResponseEntity.ok(groups);
    }

    //REST (PUT): /api/group/{id}
    @Operation(summary = "Update a group", description = "Updates a group's details using its id")
    @PutMapping("/{id}")
    public ResponseEntity<GroupDto> updateGroupById(@PathVariable("id") Long groupId, @RequestBody GroupDto groupDto) {
        GroupDto updatedGroup = groupService.updateGroupById(groupDto, groupId);
        return ResponseEntity.ok(updatedGroup);
    }

    //REST (DELETE): /api/group/{id}
    @Operation(summary = "Delete a group", description = "Deletes a group by using it's id")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGroup(@PathVariable("id") Long groupId) {
        groupService.deleteGroup(groupId);
        return ResponseEntity.ok("Group deleted successfully!");
    }
}
