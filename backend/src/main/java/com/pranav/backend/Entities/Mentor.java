package com.pranav.backend.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String name;
    private String mail;
    @Column(name = "mentor_id")
    private String mentorId;

    @ManyToOne
    @JoinColumn(name = "dept_id")
    private Department department;


    public Mentor(String name, String mail, String mentorId, Department department) {
        this.name = name;
        this.mail = mail;
        this.mentorId = mentorId;
        this.department = department;
    }
}
