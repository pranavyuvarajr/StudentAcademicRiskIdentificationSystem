package com.pranav.backend.Service;

import com.pranav.backend.DAO.UserRepository;
import com.pranav.backend.Entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;


    public User addUser(User user) {
        userRepository.save(user);

        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);


        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getEmail())
                .password("{noop}"+ user.getPassword())
                .roles(user.getRole().toUpperCase())
                .build();
    }
}
