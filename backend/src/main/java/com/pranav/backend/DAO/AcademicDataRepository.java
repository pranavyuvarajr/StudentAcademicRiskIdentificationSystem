package com.pranav.backend.DAO;

import com.pranav.backend.Entities.AcademicData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicDataRepository extends JpaRepository<AcademicData,Integer> {
}
