package com.studentrisk.controller;

import com.studentrisk.model.Student;
import com.studentrisk.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
@Tag(name = "Students", description = "Student data, CSV upload, and mentor assignment")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/upload")
    @Operation(
        summary = "Upload student CSV",
        description = "Upsert students from CSV. New students are created and assigned to mentorId. " +
                      "Existing students (matched by rollNumber) only have academic fields updated — " +
                      "mentor assignment and login account are preserved. " +
                      "Columns: name, rollNumber, attendance, prevCgpa, currCgpa, recentTest, internalMark, project, projectScore, backlogs"
    )
    public ResponseEntity<?> uploadCSV(
            @Parameter(description = "CSV file") @RequestParam("file") MultipartFile file,
            @Parameter(description = "Mentor user ID — only applied to newly added students") @RequestParam("mentorId") Long mentorId) {
        try {
            Map<String, Object> result = studentService.uploadCSV(file, mentorId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Upload failed: " + e.getMessage()
            ));
        }
    }

    @GetMapping
    @Operation(summary = "Get all students", description = "Returns every student record. Admin use.")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/mentor/{mentorId}")
    @Operation(summary = "Get students by mentor", description = "Returns students assigned to this mentor, sorted by risk score descending.")
    public ResponseEntity<List<Student>> getByMentor(
            @Parameter(description = "Mentor user ID") @PathVariable Long mentorId) {
        return ResponseEntity.ok(studentService.getStudentsByMentor(mentorId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get student by user ID", description = "Looks up the student record linked to the given user account ID.")
    public ResponseEntity<?> getById(
            @Parameter(description = "User ID of the student") @PathVariable Long id) {
        Student s = studentService.getStudentForUser(id);
        if (s != null) return ResponseEntity.ok(s);
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{studentId}/assign-mentor/{mentorId}")
    @Operation(summary = "Assign mentor", description = "Reassign a student to a different mentor.")
    public ResponseEntity<Student> assignMentor(
            @PathVariable Long studentId,
            @PathVariable Long mentorId) {
        return ResponseEntity.ok(studentService.assignMentor(studentId, mentorId));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete student", description = "Removes a student record and their linked user account.")
    public ResponseEntity<Map<String, Object>> deleteStudent(@PathVariable Long id) {
        Map<String, Object> res = new java.util.HashMap<>();
        try {
            studentService.deleteStudent(id);
            res.put("success", true);
            res.put("message", "Student deleted successfully");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }
    }
}
