package com.kraigochieng.embroideryis.server.repositories;

import com.kraigochieng.embroideryis.server.dtos.Identifier;
import com.kraigochieng.embroideryis.server.models.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PositionRepository extends JpaRepository<Position, UUID> {
}
