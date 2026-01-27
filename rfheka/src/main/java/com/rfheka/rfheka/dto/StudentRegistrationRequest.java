package com.rfheka.rfheka.dto;

import com.rfheka.rfheka.entity.CourseType;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class StudentRegistrationRequest {

    private String fullName;
    private String email;

    private CourseType courseType;
    private Long coachingCourseId;
    private LocalDate dateOfBirth;
    private String gender;
    private String fatherOrMotherName;

    private String phoneNumber;
    private String alternatePhoneNumber;
    private String aadharNumber;
    private String permanentAddress;

    private List<EducationDto> educations;
    private List<WorkExperienceDto> workExperiences;
}

