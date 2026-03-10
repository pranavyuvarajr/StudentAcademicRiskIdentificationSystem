package com.pranav.backend.Controller;

import com.pranav.backend.DTO.UserDto;
import com.pranav.backend.Entities.User;
import com.pranav.backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

//    @PostMapping("/login")
//    public UserDto authUser(@RequestBody UserDto userDto) {
//        return userService.authUser(userDto);
//    }
}
