package com.rfheka.rfheka.service;

import com.rfheka.rfheka.dto.EducationDto;
import com.rfheka.rfheka.dto.StudentRegistrationRequest;
import com.rfheka.rfheka.dto.StudentResponseDto;
import com.rfheka.rfheka.dto.WorkExperienceDto;
import com.rfheka.rfheka.entity.*;
import com.rfheka.rfheka.repository.StudentEducationRepository;
import com.rfheka.rfheka.repository.StudentProfileRepository;
import com.rfheka.rfheka.repository.StudentWorkExperienceRepository;
import com.rfheka.rfheka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final StudentEducationRepository educationRepository;
    private final StudentWorkExperienceRepository workRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final String DEFAULT_PASSWORD = "Student@2026";

    @Transactional
    public void registerStudent(StudentRegistrationRequest req) {

        // 1️⃣ Find or create user
        User user = userRepository.findByEmail(req.getEmail())
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .name(req.getFullName())
                                .email(req.getEmail())
                                .password(passwordEncoder.encode(DEFAULT_PASSWORD))
                                .userType(UserType.STUDENT)
                                .build()
                ));

        // 2️⃣ Convert existing user to STUDENT
        if (user.getUserType() != UserType.STUDENT) {
            user.setUserType(UserType.STUDENT);
            userRepository.save(user);
        }

        // 3️⃣ Prevent duplicate student profile
        if (studentProfileRepository.existsByUser(user)) {
            throw new RuntimeException("Student profile already exists for this user");
        }

        // 4️⃣ Create student profile
        StudentProfile profile = studentProfileRepository.save(
                StudentProfile.builder()
                        .user(user)
                        .courseType(req.getCourseType())
                        .dateOfBirth(req.getDateOfBirth())
                        .gender(req.getGender())
                        .fatherOrMotherName(req.getFatherOrMotherName())
                        .phoneNumber(req.getPhoneNumber())
                        .alternatePhoneNumber(req.getAlternatePhoneNumber())
                        .aadharNumber(req.getAadharNumber())
                        .permanentAddress(req.getPermanentAddress())
                        .build()
        );

        // 5️⃣ Save education details
        if (req.getEducations() != null) {
            req.getEducations().forEach(e ->
                    educationRepository.save(
                            StudentEducation.builder()
                                    .studentProfile(profile)
                                    .degreeOrClass(e.getDegreeOrClass())
                                    .institute(e.getInstitute())
                                    .boardOrUniversity(e.getBoardOrUniversity())
                                    .passingYear(e.getPassingYear())
                                    .marksOrGrade(e.getMarksOrGrade())
                                    .stream(e.getStream())
                                    .build()
                    )
            );
        }

        // 6️⃣ Save work experience
        if (req.getWorkExperiences() != null) {
            req.getWorkExperiences().forEach(w ->
                    workRepository.save(
                            StudentWorkExperience.builder()
                                    .studentProfile(profile)
                                    .companyName(w.getCompanyName())
                                    .designation(w.getDesignation())
                                    .reportingPerson(w.getReportingPerson())
                                    .reportingContact(w.getReportingContact())
                                    .jobResponsibilities(w.getJobResponsibilities())
                                    .build()
                    )
            );
        }
    }

    @Transactional(readOnly = true)
    public List<StudentResponseDto> getAllStudents() {

        return studentProfileRepository.findAll()
                .stream()
                .map(profile -> StudentResponseDto.builder()
                        .userId(profile.getUser().getId())
                        .fullName(profile.getUser().getName())
                        .email(profile.getUser().getEmail())
                        .userType(profile.getUser().getUserType().name())

                        .courseType(profile.getCourseType().name())
                        .dateOfBirth(profile.getDateOfBirth())
                        .gender(profile.getGender())
                        .fatherOrMotherName(profile.getFatherOrMotherName())

                        .phoneNumber(profile.getPhoneNumber())
                        .alternatePhoneNumber(profile.getAlternatePhoneNumber())
                        .aadharNumber(profile.getAadharNumber())
                        .permanentAddress(profile.getPermanentAddress())

                        .educations(

                                profile.getEducations().stream()
                                        .map(e -> {
                                            EducationDto dto = new EducationDto();
                                            dto.setDegreeOrClass(e.getDegreeOrClass());
                                            dto.setInstitute(e.getInstitute());
                                            dto.setBoardOrUniversity(e.getBoardOrUniversity());
                                            dto.setPassingYear(e.getPassingYear());
                                            dto.setMarksOrGrade(e.getMarksOrGrade());
                                            dto.setStream(e.getStream());
                                            return dto;
                                        }).toList()
                        )

                        .workExperiences(
                                profile.getWorkExperiences().stream()
                                        .map(w -> {
                                            WorkExperienceDto dto = new WorkExperienceDto();
                                            dto.setCompanyName(w.getCompanyName());
                                            dto.setDesignation(w.getDesignation());
                                            dto.setReportingPerson(w.getReportingPerson());
                                            dto.setReportingContact(w.getReportingContact());
                                            dto.setJobResponsibilities(w.getJobResponsibilities());
                                            return dto;
                                        }).toList()
                        )
                        .build()
                )
                .toList();
    }

}
