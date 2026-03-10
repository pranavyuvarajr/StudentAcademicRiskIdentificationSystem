package com.pranav.backend.Controller;

import com.pranav.backend.DTO.StudentDtoGet;
import com.pranav.backend.DTO.StudentDtoUser;
import com.pranav.backend.Service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping
    public String postStudent(@RequestBody StudentDtoGet studentDtoGet) {
        return studentService.postStudent(studentDtoGet);
    }

    @GetMapping
    public List<StudentDtoUser> getStudents() {
        return studentService.getStudents();
    }
}
