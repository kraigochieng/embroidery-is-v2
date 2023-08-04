package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.models.Position;
import com.kraigochieng.embroideryis.server.services.PositionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;


import java.util.List;

@RestController
@RequestMapping(path = "/api/admin/positions")
@CrossOrigin
public class PositionController {
    @Autowired
    PositionServiceImpl positionServiceImpl;

    @GetMapping(path = "get")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Position>> getPositions() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(positionServiceImpl.getPositions());
    }

    @PostMapping(path = "post/{itemId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Position> addPosition(@RequestBody Position position, @PathVariable Long itemId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(positionServiceImpl.addPosition(position, itemId));
    }

    @DeleteMapping(path = "delete/{positionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removePosition(@PathVariable Long positionId) {
        positionServiceImpl.removePosition(positionId);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PutMapping(path = "put/{positionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Position> editPosition(@RequestBody Position editedPosition,@PathVariable Long positionId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(positionServiceImpl.editPosition(editedPosition, positionId));
    }

}
