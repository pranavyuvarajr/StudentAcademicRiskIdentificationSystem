package com.studentrisk.dto;

public class CommentRequest {
    private Long studentId;
    private Long mentorId;
    private String text;

    public CommentRequest() {}
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Long getMentorId() { return mentorId; }
    public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
