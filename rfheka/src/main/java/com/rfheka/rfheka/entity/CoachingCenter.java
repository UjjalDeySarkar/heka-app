package com.rfheka.rfheka.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "coaching_centers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoachingCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String contactNumber;

    @OneToMany(
            mappedBy = "coachingCenter",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<CoachingCourse> courses = new HashSet<>();
}
