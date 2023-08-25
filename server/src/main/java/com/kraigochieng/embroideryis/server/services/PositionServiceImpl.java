package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.*;
import com.kraigochieng.embroideryis.server.mappers.ItemMapper;
import com.kraigochieng.embroideryis.server.mappers.PositionMapper;
import com.kraigochieng.embroideryis.server.models.Item;
import com.kraigochieng.embroideryis.server.models.Position;
import com.kraigochieng.embroideryis.server.repositories.ItemRepository;
import com.kraigochieng.embroideryis.server.repositories.PositionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class PositionServiceImpl implements PositionService{
    @Autowired
    PositionRepository positionRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemMapper itemMapper;

    @Autowired
    PositionMapper positionMapper;

    @Override
    @Transactional
    public PositionSummary addPosition(PositionRequest positionRequest, UUID itemId) {
        // Get Item liked to position
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new IllegalStateException("Item not found"));

        // Map DTO to Entity
        Position positionToSave = positionMapper.positionRequestToPosition(positionRequest);

        // Set Relations, sort out the bidirectional relationship
        positionToSave.setItem(item);

        // Save
        Position position = positionRepository.save(positionToSave);

        // Map Entity TO DTO
        return positionMapper.positionToPositionSummary(position);
    }

    @Override
    public List<PositionSummary> getPositions() {
        return positionRepository.findAll().stream()
                .map(positionMapper::positionToPositionSummary)
                .toList();
    }

    @Override
    public List<PositionSummary> getPositionsForItem(UUID itemId) {
        return positionRepository.findAll().stream()
                .filter(position -> Objects.equals(position.getItem().getId(), itemId))
                .map(positionMapper::positionToPositionSummary)
                .toList();
    }

    @Override
    public void removePosition(UUID positionId) {
        positionRepository.deleteById(positionId);
    }

    @Override
    @Transactional
    public PositionSummary editPosition(PositionRequest positionRequest, UUID positionId) {
        Position position = positionRepository.findById(positionId).orElseThrow(() -> new IllegalStateException("Position not edited"));
        if(!Objects.equals(position.getName(), positionRequest.getName())){
            position.setName(positionRequest.getName());
        }

        return positionMapper.positionToPositionSummary(position);
    }

    @Override
    public void removePositions(Identifiers<UUID> positionIds) {
        positionRepository.deleteAllById(positionIds.getIds());
    }
}
