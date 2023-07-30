package com.kraigochieng.embroideryis.server.repositories;

import com.kraigochieng.embroideryis.server.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
