package com.studentrisk.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;   // rollNumber for students, chosen name for mentors

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;       // ADMIN, MENTOR, STUDENT

    private String name;       // full display name
    private String department; // optional

    public User() {}

    public User(Long id, String username, String password, String role, String name, String department) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.name = name;
        this.department = department;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getPassword() { return password; }
    public void setPassword(String p) { this.password = p; }
    public String getRole() { return role; }
    public void setRole(String r) { this.role = r; }
    public String getName() { return name; }
    public void setName(String n) { this.name = n; }
    public String getDepartment() { return department; }
    public void setDepartment(String d) { this.department = d; }
}
