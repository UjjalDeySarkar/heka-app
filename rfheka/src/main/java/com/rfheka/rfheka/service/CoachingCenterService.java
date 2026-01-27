package com.rfheka.rfheka.service;

import com.rfheka.rfheka.dto.CoachingCenterCreateRequest;
import com.rfheka.rfheka.dto.CoachingCenterResponseDto;
import com.rfheka.rfheka.dto.CoachingCourseResponseDto;
import com.rfheka.rfheka.dto.CourseFeeDto;
import com.rfheka.rfheka.entity.CoachingCenter;
import com.rfheka.rfheka.entity.CoachingCourse;
import com.rfheka.rfheka.repository.CoachingCenterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CoachingCenterService {

    private final CoachingCenterRepository coachingCenterRepository;

    @Transactional
    public void createCoachingCenter(CoachingCenterCreateRequest request) {

        CoachingCenter center = CoachingCenter.builder()
                .name(request.getName())
                .address(request.getAddress())
                .contactNumber(request.getContactNumber())
                .courses(new HashSet<>())   // ✅ FIX
                .build();

        request.getCourses().forEach(c -> {
            center.getCourses().add(
                    CoachingCourse.builder()
                            .courseType(c.getCourseType())
                            .courseFee(c.getCourseFee())
                            .coachingCenter(center)
                            .build()
            );
        });

        coachingCenterRepository.save(center);
    }

    @Transactional(readOnly = true)
    public List<CoachingCenterResponseDto> getAllCoachingCenters() {

        return coachingCenterRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private CoachingCenterResponseDto mapToDto(CoachingCenter center) {

        return CoachingCenterResponseDto.builder()
                .id(center.getId())
                .name(center.getName())
                .address(center.getAddress())
                .contactNumber(center.getContactNumber())
                .courses(
                        center.getCourses().stream()
                                .map(course -> CoachingCourseResponseDto.builder()
                                        .id(course.getId())
                                        .courseType(course.getCourseType())
                                        .courseFee(course.getCourseFee())
                                        .build()
                                )
                                .toList()
                )
                .build();
    }
}
