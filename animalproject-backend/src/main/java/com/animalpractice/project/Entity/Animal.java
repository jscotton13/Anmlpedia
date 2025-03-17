package com.animalpractice.project.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="unique_animals")
@NoArgsConstructor
@AllArgsConstructor
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_id")
    public Long id;

    @Column(name="animal_name", nullable = false)
    public String name;

    @Column(name="animal_description", length = 500)
    public String desc;

    @Column(name="animal_imagepath")
    public String imgPath;

    @ManyToOne
    @JoinColumn(name = "species_id", referencedColumnName = "species_id") // Ensures foreign key is created
    private Species species;
}
