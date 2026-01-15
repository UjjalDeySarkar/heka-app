package com.rfheka.rfheka.controller;

import com.rfheka.rfheka.dto.ApiResponse;
import com.rfheka.rfheka.dto.StudentRegistrationRequest;
import com.rfheka.rfheka.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/register")
    public ApiResponse registerStudent(@RequestBody StudentRegistrationRequest request) {
        studentService.registerStudent(request);
        return new ApiResponse("Student registered successfully", true, null);
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllStudents() {

        ApiResponse response = new ApiResponse(
                "Students fetched successfully",
                true,
                studentService.getAllStudents()
        );

        return ResponseEntity.ok(response);
    }

}
