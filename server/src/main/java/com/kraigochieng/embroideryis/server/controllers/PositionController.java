package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.dtos.PositionRequest;
import com.kraigochieng.embroideryis.server.dtos.PositionSummary;
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
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "${EMBROIDERY_IS_V2_CLIENT_URL}"})
public class PositionController {
    private final String urlWithItems = "items/{itemId}/positions";
    private final String plainUrl = "positions";
    @Autowired
    PositionServiceImpl positionServiceImpl;

    @GetMapping(path = plainUrl)
    @PreAuthorize("hasAuthority('SCOPE_READ_POSITION')")
    public ResponseEntity<List<PositionSummary>> getPositions() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(positionServiceImpl.getPositions());
    }

    @GetMapping(path = urlWithItems)
    @PreAuthorize("hasAuthority('SCOPE_READ_POSITION')")
    public ResponseEntity<List<PositionSummary>> getPositionsForItem(@PathVariable UUID itemId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(positionServiceImpl.getPositionsForItem(itemId));
    }

    @PostMapping(path = urlWithItems)
    @PreAuthorize("hasAuthority('SCOPE_CREATE_POSITION')")
    public ResponseEntity<PositionSummary> addPosition(@RequestBody PositionRequest positionRequest, @PathVariable UUID itemId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(positionServiceImpl.addPosition(positionRequest, itemId));
    }

    @PutMapping(path = plainUrl + "/{positionId}")
    @PreAuthorize("hasAuthority('SCOPE_UPDATE_POSITION')")
    public ResponseEntity<PositionSummary> editPosition(@RequestBody PositionRequest positionRequest,@PathVariable UUID positionId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(positionServiceImpl.editPosition(positionRequest, positionId));
    }

    @DeleteMapping(path = plainUrl + "/{positionId}")
    @PreAuthorize("hasAuthority('SCOPE_DELETE_POSITION')")
    public ResponseEntity<Void> removePosition(@PathVariable UUID positionId) {
        positionServiceImpl.removePosition(positionId);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping(path = plainUrl)
    @PreAuthorize("hasAuthority('SCOPE_DELETE_POSITION')")
    public ResponseEntity<Void> removePositions(@RequestBody Identifiers<UUID> positionIds) {
        positionServiceImpl.removePositions(positionIds);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
