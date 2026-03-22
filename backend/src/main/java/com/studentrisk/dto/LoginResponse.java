package com.studentrisk.dto;

public class LoginResponse {
    private Long id;
    private String username;
    private String role;
    private String name;
    private String department;
    private String message;

    public LoginResponse() {}

    public LoginResponse(Long id, String username, String role, String name, String department, String message) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.name = name;
        this.department = department;
        this.message = message;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getRole() { return role; }
    public void setRole(String r) { this.role = r; }
    public String getName() { return name; }
    public void setName(String n) { this.name = n; }
    public String getDepartment() { return department; }
    public void setDepartment(String d) { this.department = d; }
    public String getMessage() { return message; }
    public void setMessage(String m) { this.message = m; }
}
