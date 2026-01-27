package com.rfheka.rfheka.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    private CourseType courseType;

    private LocalDate dateOfBirth;
    private String gender;
    private String fatherOrMotherName;

    private String phoneNumber;
    private String alternatePhoneNumber;

    private String aadharNumber;

    @Column(columnDefinition = "TEXT")
    private String permanentAddress;

    // 🔽 ADD THESE TWO BLOCKS 🔽

    @OneToMany(
            mappedBy = "studentProfile",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<StudentEducation> educations = new HashSet<>();

    @OneToMany(
            mappedBy = "studentProfile",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<StudentWorkExperience> workExperiences = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "coaching_course_id", nullable = true)
    private CoachingCourse coachingCourse;

}

