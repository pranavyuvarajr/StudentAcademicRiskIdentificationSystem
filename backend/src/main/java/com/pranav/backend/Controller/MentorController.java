package com.pranav.backend.Controller;

import com.pranav.backend.DTO.MentorDtoGet;
import com.pranav.backend.Entities.Mentor;
import com.pranav.backend.Entities.Student;
import com.pranav.backend.Service.MentorService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/mentor")
public class MentorController {

    private final MentorService mentorService;

    @PostMapping
    public String addMentor(@RequestBody MentorDtoGet mentorDtoGet) {
        return mentorService.postMentor(mentorDtoGet);
    }
    @GetMapping
    public List<Mentor> getAllMentors() {
        return  mentorService.getAllMentors();
    }
    @GetMapping("/{id}")
    public List<Student> getStudents(@PathVariable String id) {
        return mentorService.getStudent(id);
    }
}
