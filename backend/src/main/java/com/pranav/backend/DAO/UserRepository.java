package com.pranav.backend.DAO;

import com.pranav.backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
