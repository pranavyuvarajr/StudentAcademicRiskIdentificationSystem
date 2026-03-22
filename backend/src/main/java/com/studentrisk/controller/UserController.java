package com.studentrisk.controller;

import com.studentrisk.model.User;
import com.studentrisk.repository.StudentRepository;
import com.studentrisk.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
@Tag(name = "Users", description = "Mentor account management")
public class UserController {

    @Autowired private UserRepository userRepository;
    @Autowired private StudentRepository studentRepository;

    @GetMapping("/mentors")
    @Operation(summary = "Get all mentors", description = "Returns all user accounts with role MENTOR.")
    public ResponseEntity<List<User>> getMentors() {
        return ResponseEntity.ok(userRepository.findByRole("MENTOR"));
    }

    @PostMapping("/mentors")
    @Operation(summary = "Add mentor", description = "Create a new mentor account. Fields: username, password, name (required), department (optional).")
    public ResponseEntity<Map<String, Object>> addMentor(@RequestBody Map<String, String> body) {
        Map<String, Object> res = new HashMap<>();
        String username   = body.getOrDefault("username",   "").trim();
        String password   = body.getOrDefault("password",   "").trim();
        String name       = body.getOrDefault("name",       "").trim();
        String department = body.getOrDefault("department", "").trim();

        if (username.isEmpty())   { res.put("success", false); res.put("message", "Username is required");   return ResponseEntity.badRequest().body(res); }
        if (password.isEmpty())   { res.put("success", false); res.put("message", "Password is required");   return ResponseEntity.badRequest().body(res); }
        if (name.isEmpty())       { res.put("success", false); res.put("message", "Mentor name is required"); return ResponseEntity.badRequest().body(res); }
        if (userRepository.findByUsername(username).isPresent()) {
            res.put("success", false);
            res.put("message", "Username \"" + username + "\" is already taken");
            return ResponseEntity.badRequest().body(res);
        }

        User saved = userRepository.save(new User(null, username, password, "MENTOR", name, department.isEmpty() ? null : department));
        res.put("success", true);
        res.put("message", "Mentor created successfully");
        res.put("id", saved.getId());
        res.put("username", saved.getUsername());
        res.put("name", saved.getName());
        res.put("department", saved.getDepartment());
        res.put("role", saved.getRole());
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/mentors/{id}")
    @Operation(summary = "Delete mentor", description = "Remove a mentor account. Blocked if students are still assigned.")
    public ResponseEntity<Map<String, Object>> deleteMentor(@PathVariable Long id) {
        Map<String, Object> res = new HashMap<>();
        User user = userRepository.findById(id).orElse(null);
        if (user == null)                   { res.put("success", false); res.put("message", "Mentor not found");          return ResponseEntity.badRequest().body(res); }
        if (!"MENTOR".equals(user.getRole())) { res.put("success", false); res.put("message", "User is not a mentor");      return ResponseEntity.badRequest().body(res); }

        long assigned = studentRepository.findByMentorIdOrderByRiskScoreDesc(id).size();
        if (assigned > 0) {
            res.put("success", false);
            res.put("message", assigned + " student(s) still assigned. Reassign them first.");
            return ResponseEntity.badRequest().body(res);
        }
        userRepository.deleteById(id);
        res.put("success", true);
        res.put("message", "Mentor \"" + user.getName() + "\" removed");
        return ResponseEntity.ok(res);
    }
}
