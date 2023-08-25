package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.*;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface PositionService {
    public PositionSummary addPosition(PositionRequest positionRequest, UUID itemId);
    public List<PositionSummary> getPositions();
    public List<PositionSummary> getPositionsForItem(UUID itemId);
    public void removePosition(UUID positionId);
    @Transactional
    public PositionSummary editPosition(PositionRequest positionRequest, UUID positionId);
    public void removePositions(Identifiers<UUID> positionIds);
}
