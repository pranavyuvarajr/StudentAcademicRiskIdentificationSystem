package com.studentrisk.repository;

import com.studentrisk.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByMentorIdOrderByRiskScoreDesc(Long mentorId);
    Optional<Student> findByRollNumber(String rollNumber);
    Optional<Student> findByUsername(String username);
}
