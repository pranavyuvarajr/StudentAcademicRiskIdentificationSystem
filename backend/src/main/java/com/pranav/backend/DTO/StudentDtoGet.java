package com.pranav.backend.DTO;

import com.pranav.backend.Entities.AcademicData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDtoGet {
    private String name;
    private String regNo;
    private String mail;
    private Integer year;
    private String code;
    private String mentorId;
    private AcademicData academicData;
}
