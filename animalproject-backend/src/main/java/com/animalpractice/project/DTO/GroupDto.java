package com.animalpractice.project.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GroupDto {

    private Long id;
    private String name;
    private String desc;
    private String imgPath;
    @JsonManagedReference //prevents infinite recursion
    @JsonIgnore
    private List<SpeciesDto> speciesList;
}
