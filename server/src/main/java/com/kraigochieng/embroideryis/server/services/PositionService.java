package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Item;
import com.kraigochieng.embroideryis.server.models.Position;
import com.kraigochieng.embroideryis.server.repositories.ItemRepository;
import com.kraigochieng.embroideryis.server.repositories.PositionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionService {
    private final PositionRepository positionRepository;
    private final ItemRepository itemRepository;
    @Autowired
    public PositionService(PositionRepository positionRepository,ItemRepository itemRepository) {
        this.positionRepository = positionRepository;
        this.itemRepository = itemRepository;
    }

    public ResponseEntity<Position> addPosition(Position position, Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new IllegalStateException("Item not found"));
        position.setItem(item);
        item.getPositions().add(position);
        return ResponseEntity.ok(positionRepository.save(position));
    }

    public ResponseEntity<List<Position>> getPositions() {
        return ResponseEntity.ok(positionRepository.findAll());
    }

    public ResponseEntity<String> removePosition(Long positionId) {
        positionRepository.deleteById(positionId);
        return ResponseEntity.ok("Position with ID: " + positionId + "deleted");
    }
    @Transactional
    public ResponseEntity<Position> editPosition(Position editedPosition, Long positionId) {
        Position position = positionRepository.findById(positionId).orElseThrow(() -> new IllegalStateException("Position not edited"));
        if(position.getName() != editedPosition.getName() && editedPosition.getName().length() > 0){
            position.setName(editedPosition.getName());
        }
        return ResponseEntity.ok(position);
    }
}
