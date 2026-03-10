package com.pranav.backend.Service;

import com.pranav.backend.DAO.AcademicDataRepository;
import com.pranav.backend.DAO.DeptRepository;
import com.pranav.backend.DAO.MentorRepository;
import com.pranav.backend.DAO.StudentRepository;
import com.pranav.backend.DTO.StudentDtoGet;
import com.pranav.backend.DTO.StudentDtoUser;
import com.pranav.backend.Entities.Student;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final DeptRepository deptRepository;
    private final AcademicDataRepository academicDataRepository;
    private final MentorRepository mentorRepository;


    public String postStudent(StudentDtoGet studentDtoGet) {
        academicDataRepository.save(studentDtoGet.getAcademicData());

        Student student = new Student();

        student.setName(studentDtoGet.getName());
        student.setRegNo(studentDtoGet.getRegNo());
        student.setMail(studentDtoGet.getMail());
        student.setYear(studentDtoGet.getYear());
        student.setDepartment(deptRepository.findByCode(studentDtoGet.getCode()).orElseThrow(() -> new RuntimeException("Null")));
        student.setMentorId(studentDtoGet.getMentorId());
        student.setAcademicData(studentDtoGet.getAcademicData());

        studentRepository.save(student);
        return "Student saved";
    }

    public List<StudentDtoUser> getStudents() {
        return studentRepository.findAll().stream().map(n -> new StudentDtoUser(
                n.getName(),
                n.getRegNo(),
                n.getMail(),
                n.getYear(),
                n.getDepartment().getName(),
                n.getAcademicData().getCurrCgpa(),
                n.getAcademicData().getRecentTest(),
                n.getAcademicData().getAttendance(),
                mentorRepository.findByMentorId(n.getMentorId()).getName()
        )).toList();
    }
}
