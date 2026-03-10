package com.pranav.backend.Controller;

import com.pranav.backend.Entities.Department;
import com.pranav.backend.Service.DeptService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dept")
@AllArgsConstructor
public class DeptController {
    private final DeptService deptService;

    @PostMapping
    public String postDept(@RequestBody Department department) {
        return deptService.postDept(department);
    }
}
