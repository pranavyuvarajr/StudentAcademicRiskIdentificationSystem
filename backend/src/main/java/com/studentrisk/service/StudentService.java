package com.studentrisk.service;

import com.opencsv.CSVReader;
import com.studentrisk.model.Student;
import com.studentrisk.model.User;
import com.studentrisk.repository.CommentRepository;
import com.studentrisk.repository.StudentRepository;
import com.studentrisk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.*;

@Service
public class StudentService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private UserRepository    userRepository;
    @Autowired private CommentRepository commentRepository;
    @Autowired private RiskCalculator    riskCalculator;

    /**
     * Upload students from CSV.
     *
     * RULES:
     *  - Students NOT in the CSV → completely untouched (no delete, no change)
     *  - Students IN the CSV whose rollNumber already exists → ONLY academic
     *    fields are updated + risk recalculated. mentorId, username, password,
     *    comments → never touched.
     *  - Students IN the CSV whose rollNumber is new → created fresh and
     *    assigned to the mentorId selected during upload.
     */
    public Map<String, Object> uploadCSV(MultipartFile file, Long mentorId) throws Exception {

        // Snapshot how many students exist BEFORE upload
        long totalBefore = studentRepository.count();

        int created = 0;
        int updated = 0;

        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] line;
            boolean firstRow = true;

            while ((line = reader.readNext()) != null) {
                // Skip header row
                if (firstRow) { firstRow = false; continue; }
                // Skip malformed rows
                if (line.length < 10) continue;

                String name       = line[0].trim();
                String rollNumber = line[1].trim();
                if (rollNumber.isEmpty()) continue;

                // Parse academic values safely
                double attendance   = parseDouble(line[2]);
                double prevCgpa     = parseDouble(line[3]);
                double currCgpa     = parseDouble(line[4]);
                double recentTest   = parseDouble(line[5]);
                double internalMark = parseDouble(line[6]);
                double project      = parseDouble(line[7]);
                double projectScore = parseDouble(line[8]);
                int    backlogs     = parseInt(line[9]);

                Optional<Student> existing = studentRepository.findByRollNumber(rollNumber);

                if (existing.isPresent()) {
                    // ── EXISTING STUDENT: update academic data only ──────────────────
                    Student s = existing.get();
                    s.setName(name);
                    s.setAttendance(attendance);
                    s.setPrevCgpa(prevCgpa);
                    s.setCurrCgpa(currCgpa);
                    s.setRecentTest(recentTest);
                    s.setInternalMark(internalMark);
                    s.setProject(project);
                    s.setProjectScore(projectScore);
                    s.setBacklogs(backlogs);
                    // mentorId → NOT changed
                    // username → NOT changed
                    riskCalculator.calculate(s);
                    studentRepository.save(s);

                    // Keep user account name in sync
                    userRepository.findByUsername(rollNumber).ifPresent(u -> {
                        u.setName(name);
                        userRepository.save(u);
                    });
                    updated++;

                } else {
                    // ── NEW STUDENT: create record + login account ───────────────────
                    Student s = new Student();
                    s.setName(name);
                    s.setRollNumber(rollNumber);
                    s.setAttendance(attendance);
                    s.setPrevCgpa(prevCgpa);
                    s.setCurrCgpa(currCgpa);
                    s.setRecentTest(recentTest);
                    s.setInternalMark(internalMark);
                    s.setProject(project);
                    s.setProjectScore(projectScore);
                    s.setBacklogs(backlogs);
                    s.setMentorId(mentorId);
                    s.setUsername(rollNumber);
                    riskCalculator.calculate(s);
                    studentRepository.save(s);

                    // Create login account only if not already present
                    if (userRepository.findByUsername(rollNumber).isEmpty()) {
                        userRepository.save(
                            new User(null, rollNumber, rollNumber, "STUDENT", name, null)
                        );
                    }
                    created++;
                }
            }
        }

        long totalAfter    = studentRepository.count();
        long untouched     = totalAfter - totalBefore - created;
        // untouched = students that existed before and were not in this CSV

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("created",   created);
        result.put("updated",   updated);
        result.put("untouched", Math.max(0, untouched));
        result.put("total",     (int) totalAfter);
        result.put("message",
            created   + " new student(s) added, " +
            updated   + " updated, " +
            Math.max(0, untouched) + " untouched");
        return result;
    }

    // ── Safe parsers ──────────────────────────────────────────────────────────
    private double parseDouble(String s) {
        try { return Double.parseDouble(s.trim()); } catch (Exception e) { return 0.0; }
    }
    private int parseInt(String s) {
        try { return Integer.parseInt(s.trim()); } catch (Exception e) { return 0; }
    }

    // ── Other methods ─────────────────────────────────────────────────────────
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Student> getStudentsByMentor(Long mentorId) {
        return studentRepository.findByMentorIdOrderByRiskScoreDesc(mentorId);
    }

    public Student assignMentor(Long studentId, Long mentorId) {
        Student s = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        s.setMentorId(mentorId);
        return studentRepository.save(s);
    }

    public Student getStudentForUser(Long userId) {
        return userRepository.findById(userId)
                .flatMap(u -> studentRepository.findByUsername(u.getUsername()))
                .orElse(null);
    }

    public void deleteStudent(Long studentId) {
        Student s = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        commentRepository.findByStudentIdOrderByCreatedAtDesc(studentId)
                .forEach(c -> commentRepository.deleteById(c.getId()));
        if (s.getUsername() != null) {
            userRepository.findByUsername(s.getUsername())
                    .ifPresent(u -> userRepository.deleteById(u.getId()));
        }
        studentRepository.deleteById(studentId);
    }
}
