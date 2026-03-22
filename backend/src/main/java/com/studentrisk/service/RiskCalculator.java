package com.studentrisk.service;

import com.studentrisk.model.Student;
import org.springframework.stereotype.Component;

@Component
public class RiskCalculator {

    public void calculate(Student s) {
        double score =
            (100 - s.getAttendance()) * 0.15 +
            (100 - s.getCurrCgpa() * 10) * 0.20 +
            (100 - s.getPrevCgpa() * 10) * 0.10 +
            (100 - s.getRecentTest()) * 0.15 +
            (100 - s.getInternalMark()) * 0.10 +
            (s.getBacklogs() * 10) * 0.10 +
            (100 - s.getProjectScore()) * 0.10 +
            (100 - s.getProject()) * 0.10;

        score = Math.max(0, Math.min(100, score));
        s.setRiskScore(Math.round(score * 100.0) / 100.0);

        if (score <= 33) s.setRiskLevel("LOW");
        else if (score <= 66) s.setRiskLevel("MEDIUM");
        else s.setRiskLevel("HIGH");
    }
}
