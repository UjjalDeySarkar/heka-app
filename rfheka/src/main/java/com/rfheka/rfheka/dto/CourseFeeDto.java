package com.rfheka.rfheka.dto;

import com.rfheka.rfheka.entity.CourseType;
import lombok.Data;

@Data
public class CourseFeeDto {
    private CourseType courseType;
    private Double courseFee;
}
