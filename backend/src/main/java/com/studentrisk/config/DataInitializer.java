package com.studentrisk.config;

import com.studentrisk.model.Student;
import com.studentrisk.model.User;
import com.studentrisk.repository.StudentRepository;
import com.studentrisk.repository.UserRepository;
import com.studentrisk.service.RiskCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private RiskCalculator riskCalculator;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            // Admin
            userRepository.save(new User(null, "admin", "admin123", "ADMIN", "Administrator", null));

            // Mentors — username is login id, name is display name
            userRepository.save(new User(null, "mentor1", "mentor123", "MENTOR", "Dr. Ramesh Kumar",   "Computer Science"));
            userRepository.save(new User(null, "mentor2", "mentor123", "MENTOR", "Prof. Priya Nair",   "Information Technology"));

            // Demo student user — login with roll number as both username & password
            userRepository.save(new User(null, "21CS001", "21CS001", "STUDENT", "Demo Student", null));

            System.out.println("Default users seeded");
        }

        if (studentRepository.count() == 0) {
            Student demo = new Student();
            demo.setName("Demo Student");
            demo.setRollNumber("21CS001");
            demo.setAttendance(72.0);
            demo.setPrevCgpa(6.5);
            demo.setCurrCgpa(6.8);
            demo.setRecentTest(58.0);
            demo.setInternalMark(62.0);
            demo.setProject(70.0);
            demo.setProjectScore(65.0);
            demo.setBacklogs(2);
            demo.setMentorId(2L);
            demo.setUsername("21CS001");
            riskCalculator.calculate(demo);
            studentRepository.save(demo);
            System.out.println("✅ Demo student seeded — Risk: " + demo.getRiskLevel()
                    + " (" + demo.getRiskScore() + ")");
            System.out.println("   Login: username=21CS001  password=21CS001");
        }
    }
}
