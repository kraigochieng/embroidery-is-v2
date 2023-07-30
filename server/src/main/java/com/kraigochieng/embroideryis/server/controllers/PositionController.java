package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.models.Position;
import com.kraigochieng.embroideryis.server.services.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Position>> getPositions() {
        return positionService.getPositions();
    }
    @PostMapping("{itemId}")
    public ResponseEntity<Position> addPosition(@RequestBody Position position, @PathVariable Long itemId) {
        return positionService.addPosition(position, itemId);
    }

    @DeleteMapping("{positionId}")
    public ResponseEntity<String> removePosition(@PathVariable Long positionId) {
        return positionService.removePosition(positionId);
    }

    @PutMapping("{positionId}")
    public ResponseEntity<Position> editPosition(@RequestBody Position editedPosition,@PathVariable Long positionId) {
        return positionService.editPosition(editedPosition, positionId);
    }

}
