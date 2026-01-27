package com.rfheka.rfheka.dto;

import com.rfheka.rfheka.entity.CourseType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CoachingCourseResponseDto {

    private Long id;
    private CourseType courseType;
    private Double courseFee;
}
