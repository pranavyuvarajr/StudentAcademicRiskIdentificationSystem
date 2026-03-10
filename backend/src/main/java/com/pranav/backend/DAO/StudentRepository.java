package com.pranav.backend.DAO;

import com.pranav.backend.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    List<Student> findAllByMentorId(String mentorId);
}
