package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Position;
import jakarta.transaction.Transactional;

import java.util.List;

public interface PositionService {
    public Position addPosition(Position position, Long itemId);
    public List<Position> getPositions();
    public String removePosition(Long positionId);
    @Transactional
    public Position editPosition(Position editedPosition, Long positionId);
}
