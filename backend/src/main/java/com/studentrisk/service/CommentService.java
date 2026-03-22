package com.studentrisk.service;

import com.studentrisk.dto.CommentRequest;
import com.studentrisk.model.Comment;
import com.studentrisk.repository.CommentRepository;
import com.studentrisk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment addComment(CommentRequest req) {
        Comment c = new Comment();
        c.setStudentId(req.getStudentId());
        c.setMentorId(req.getMentorId());
        c.setText(req.getText());
        c.setCreatedAt(LocalDateTime.now());
        userRepository.findById(req.getMentorId())
                .ifPresent(u -> c.setMentorName(u.getUsername()));
        return commentRepository.save(c);
    }

    public List<Comment> getComments(Long studentId) {
        return commentRepository.findByStudentIdOrderByCreatedAtDesc(studentId);
    }
}
