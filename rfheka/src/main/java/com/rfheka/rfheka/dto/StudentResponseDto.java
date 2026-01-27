package com.rfheka.rfheka.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import com.rfheka.rfheka.dto.EducationDto;
import com.rfheka.rfheka.dto.WorkExperienceDto;

@Data
@Builder
public class StudentResponseDto {

    private Long userId;
    private String fullName;
    private String email;
    private String userType;

    // Course details
    private Long coachingCourseId;
    private Double courseFee;

    // Coaching center details
    private Long coachingCenterId;
    private String coachingCenterName;

    private String courseType;
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
