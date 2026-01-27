package com.rfheka.rfheka.controller;

import com.rfheka.rfheka.dto.ApiResponse;
import com.rfheka.rfheka.dto.CoachingCenterCreateRequest;
import com.rfheka.rfheka.service.CoachingCenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coaching-centers")
@RequiredArgsConstructor
public class CoachingCenterController {

    private final CoachingCenterService coachingCenterService;

    @PostMapping
    public ApiResponse createCoachingCenter(@RequestBody CoachingCenterCreateRequest request) {
        coachingCenterService.createCoachingCenter(request);
        return new ApiResponse("Coaching center created successfully", true, null);
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCoachingCenters() {

        return ResponseEntity.ok(
                new ApiResponse(
                        "Coaching centers fetched successfully",
                        true,
                        coachingCenterService.getAllCoachingCenters()
                )
        );
    }
}
