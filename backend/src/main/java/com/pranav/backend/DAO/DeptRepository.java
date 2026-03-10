package com.pranav.backend.DAO;

import com.pranav.backend.Entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeptRepository extends JpaRepository<Department, Integer> {
    Optional<Department> findByCode(String code);
}
