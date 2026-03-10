package com.pranav.backend.Service;

import com.pranav.backend.DAO.DeptRepository;
import com.pranav.backend.DAO.MentorRepository;
import com.pranav.backend.DAO.StudentRepository;
import com.pranav.backend.DTO.MentorDtoGet;
import com.pranav.backend.DTO.StudentDtoUser;
import com.pranav.backend.Entities.Mentor;
import com.pranav.backend.Entities.Student;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@AllArgsConstructor
@Service
public class MentorService {
    private final DeptRepository deptRepository;
    private final MentorRepository mentorRepository;
    private final StudentRepository studentRepository;

    public String postMentor(MentorDtoGet mentorDtoGet) {
        Mentor mentor = new Mentor(mentorDtoGet.getName(), mentorDtoGet.getMail(), mentorDtoGet.getMentorId(), deptRepository.findByCode(mentorDtoGet.getDeptCode()).orElseThrow(() -> new RuntimeException("Not available!")));

        mentorRepository.save(mentor);
        return "Mentor created";
    }

    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    public List<Student> getStudent(String mentor) {
        String id = mentorRepository.findByName(mentor).getMentorId();

        return studentRepository.findAllByMentorId(id);
    }
}
