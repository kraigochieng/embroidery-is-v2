package com.kraigochieng.embroideryis.server.position;

import com.kraigochieng.embroideryis.server.item.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/admin/positions")
@CrossOrigin
public class PositionController {
    private final PositionService positionService;
    @Autowired
    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping
    public List<Position> getPositions() {
        return positionService.getPositions();
    }
    @PostMapping("{itemId}")
    public Position addPosition(@RequestBody Position position, @PathVariable Long itemId) {
        return positionService.addPosition(position, itemId);
    }

    @DeleteMapping("{positionId}")
    public void removePosition(@PathVariable Long positionId) {
        positionService.removePosition(positionId);
    }

    @PutMapping("{positionId}")
    public Position editPosition(@RequestBody Position editedPosition,@PathVariable Long positionId) {
        return positionService.editPosition(editedPosition, positionId);
    }

}
