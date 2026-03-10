package com.pranav.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StudentDtoUser {
    private String name;
    private String regNo;
    private String mail;
    private Integer year;
    private String department;
    private Integer gpa;
    private Integer recentTest;
    private Integer attendance;
    private String mentor;
}
