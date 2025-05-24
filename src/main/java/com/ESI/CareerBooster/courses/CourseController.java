package com.ESI.CareerBooster.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseraService courseraService;

    @GetMapping
    public ResponseEntity<String> getCourses(@RequestParam String category) {
        String result = courseraService.fetchCoursesByCategory(category);
        return ResponseEntity.ok(result);
    }
} 