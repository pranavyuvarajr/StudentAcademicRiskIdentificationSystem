package com.studentrisk.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String rollNumber;
    private double attendance;
    private double prevCgpa;
    private double currCgpa;
    private double recentTest;
    private double internalMark;
    private double project;
    private double projectScore;
    private int backlogs;
    private double riskScore;
    private String riskLevel;
    private Long mentorId;
    private String username;

    public Student() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public double getAttendance() { return attendance; }
    public void setAttendance(double attendance) { this.attendance = attendance; }
    public double getPrevCgpa() { return prevCgpa; }
    public void setPrevCgpa(double prevCgpa) { this.prevCgpa = prevCgpa; }
    public double getCurrCgpa() { return currCgpa; }
    public void setCurrCgpa(double currCgpa) { this.currCgpa = currCgpa; }
    public double getRecentTest() { return recentTest; }
    public void setRecentTest(double recentTest) { this.recentTest = recentTest; }
    public double getInternalMark() { return internalMark; }
    public void setInternalMark(double internalMark) { this.internalMark = internalMark; }
    public double getProject() { return project; }
    public void setProject(double project) { this.project = project; }
    public double getProjectScore() { return projectScore; }
    public void setProjectScore(double projectScore) { this.projectScore = projectScore; }
    public int getBacklogs() { return backlogs; }
    public void setBacklogs(int backlogs) { this.backlogs = backlogs; }
    public double getRiskScore() { return riskScore; }
    public void setRiskScore(double riskScore) { this.riskScore = riskScore; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public Long getMentorId() { return mentorId; }
    public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
