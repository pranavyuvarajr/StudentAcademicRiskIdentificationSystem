package com.pranav.backend.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class AcademicData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "data_id")
    private Integer id;
    private Integer attendance;
    @Column(name = "prev_cgpa")
    private Integer prevCgpa;
    @Column(name = "curr_cgpa")
    private Integer currCgpa;
    @Column(name = "recent_test")
    private Integer recentTest;
    @Column(name = "internal_mark")
    private Integer internalMark;
    @Column(name = "no_of_project")
    private Integer project;
}
