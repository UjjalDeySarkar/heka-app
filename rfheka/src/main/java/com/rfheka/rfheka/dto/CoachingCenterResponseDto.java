package com.rfheka.rfheka.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CoachingCenterResponseDto {

    private Long id;
    private String name;
    private String address;
    private String contactNumber;

    private List<CoachingCourseResponseDto> courses;
}
