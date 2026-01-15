package com.rfheka.rfheka.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_educations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentEducation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    private String degreeOrClass;
    private String institute;
    private String boardOrUniversity;
    private Integer passingYear;
    private String marksOrGrade;
    private String stream;
}

