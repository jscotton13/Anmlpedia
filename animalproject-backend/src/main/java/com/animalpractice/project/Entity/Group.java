package com.animalpractice.project.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name="animal_group")
@NoArgsConstructor
@AllArgsConstructor
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    public Long id;

    @Column(name="group_name", nullable = false)
    public String name;

    @Column(name="group_description", length = 500)
    public String desc;

    @Column(name="group_imagepath")
    public String imgPath;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Species> speciesList; //One group can have multiple species

}
