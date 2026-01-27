package com.rfheka.rfheka.repository;

import com.rfheka.rfheka.entity.StudentProfile;
import com.rfheka.rfheka.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    boolean existsByUser(User user);

    @EntityGraph(attributePaths = {
            "user",
            "educations",
            "workExperiences",
            "coachingCourse",
            "coachingCourse.coachingCenter",
    })
    List<StudentProfile> findAll();
}
