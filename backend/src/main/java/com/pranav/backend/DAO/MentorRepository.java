package com.pranav.backend.DAO;

import com.pranav.backend.Entities.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorRepository extends JpaRepository<Mentor,Integer> {
    Mentor findByMentorId(String mentorId);
    Mentor findByName(String name);
}
