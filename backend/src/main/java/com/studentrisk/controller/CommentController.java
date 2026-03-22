package com.studentrisk.controller;

import com.studentrisk.dto.CommentRequest;
import com.studentrisk.model.Comment;
import com.studentrisk.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "*")
@Tag(name = "Comments", description = "Mentor feedback comments on students")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    @Operation(summary = "Add comment", description = "Mentor adds a feedback comment for a student.")
    public ResponseEntity<Comment> addComment(@RequestBody CommentRequest req) {
        return ResponseEntity.ok(commentService.addComment(req));
    }

    @GetMapping("/{studentId}")
    @Operation(summary = "Get comments", description = "Returns all comments for a student, newest first.")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long studentId) {
        return ResponseEntity.ok(commentService.getComments(studentId));
    }
}
