package com.rfheka.rfheka.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coaching_courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoachingCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CourseType courseType;

    private Double courseFee;

    @ManyToOne
    @JoinColumn(name = "coaching_center_id", nullable = false)
    private CoachingCenter coachingCenter;
}
