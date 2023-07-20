package com.kraigochieng.embroideryis.server.position;

import com.kraigochieng.embroideryis.server.item.Item;
import com.kraigochieng.embroideryis.server.item.ItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Position addPosition(Position position, Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new IllegalStateException("Item not found"));
        position.setItem(item);
        item.getPositions().add(position);
        return positionRepository.save(position);
    }


    public List<Position> getPositions() {
        return positionRepository.findAll();
    }

    public void removePosition(Long positionId) {
        positionRepository.deleteById(positionId);
    }
    @Transactional
    public Position editPosition(Position editedPosition, Long positionId) {
        Position position = positionRepository.findById(positionId).orElseThrow(() -> new IllegalStateException("Position not edited"));
        if(position.getName() != editedPosition.getName() && editedPosition.getName().length() > 0){
            position.setName(editedPosition.getName());
        }
        return position;
    }
}
