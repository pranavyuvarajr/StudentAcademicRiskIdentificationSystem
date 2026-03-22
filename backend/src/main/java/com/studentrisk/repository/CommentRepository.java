package com.studentrisk.repository;

import com.studentrisk.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByStudentIdOrderByCreatedAtDesc(Long studentId);
}
