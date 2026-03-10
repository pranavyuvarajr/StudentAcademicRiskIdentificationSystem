package com.pranav.backend.Service;

import com.pranav.backend.DAO.DeptRepository;
import com.pranav.backend.Entities.Department;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DeptService {
    DeptRepository deptRepository;

//    double temp = Math.pow(1, 2);


    public String postDept(Department department) {
        deptRepository.save(department);
        return "Department created";
    }
}
