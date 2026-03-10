package com.pranav.backend.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String regNo;
    private String mail;
    private Integer year;

    @ManyToOne
    @JoinColumn(name = "dept_id")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "data_id")
    private AcademicData academicData;

    @Column(name = "mentor_id")
    private String mentorId;

    @Column(name = "risk_level")
    private Integer riskLevel;
}
