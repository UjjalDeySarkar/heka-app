package com.rfheka.rfheka.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_work_experience")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentWorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    private String companyName;
    private String designation;
    private String reportingPerson;
    private String reportingContact;

    @Column(columnDefinition = "TEXT")
    private String jobResponsibilities;
}

