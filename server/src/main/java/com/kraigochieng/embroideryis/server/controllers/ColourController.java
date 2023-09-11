package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.ColourRequest;
import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.models.Colour;
import com.kraigochieng.embroideryis.server.services.ColourServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/admin/colours")
@CrossOrigin(origins = "${EMBROIDERY_IS_V2-CLIENT_URL}")
@Slf4j
public class ColourController {
    @Autowired
    ColourServiceImpl colourServiceImpl;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_READ_COLOUR')")
    public ResponseEntity<List<Colour>> getColours() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(colourServiceImpl.getColours());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_CREATE_COLOUR')")
    public ResponseEntity<Colour> addColour(@RequestBody ColourRequest colourRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(colourServiceImpl.addColour(colourRequest));
    }

    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('SCOPE_UPDATE_COLOUR')")
    public ResponseEntity<Colour> editColour(@RequestBody ColourRequest colourRequest, @PathVariable UUID id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(colourServiceImpl.editColour(colourRequest, id));
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('SCOPE_DELETE_COLOUR')")
    public ResponseEntity<Void> removeColour(@PathVariable UUID id) {
        colourServiceImpl.removeColour(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('SCOPE_DELETE_COLOUR')")
    public ResponseEntity<Void> removeColours(@RequestBody Identifiers<UUID> colourIds) {
        colourServiceImpl.removeColours(colourIds);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
