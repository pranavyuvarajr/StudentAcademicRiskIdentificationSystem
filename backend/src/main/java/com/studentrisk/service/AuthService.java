package com.studentrisk.service;

import com.studentrisk.dto.LoginRequest;
import com.studentrisk.dto.LoginResponse;
import com.studentrisk.model.User;
import com.studentrisk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsernameAndPassword(
                request.getUsername(), request.getPassword());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                user.getName(),
                user.getDepartment(),
                "Login successful"
            );
        }
        return null;
    }
}
