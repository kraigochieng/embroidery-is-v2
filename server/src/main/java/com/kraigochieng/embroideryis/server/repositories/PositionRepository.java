package com.kraigochieng.embroideryis.server.repositories;

import com.kraigochieng.embroideryis.server.models.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
}
