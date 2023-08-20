package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.ColourCreation;
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

@RestController
@RequestMapping(path = "/api/admin/colours")
@CrossOrigin
@Slf4j
public class ColourController {
    @Autowired
    ColourServiceImpl colourServiceImpl;

    @GetMapping(path = "get")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Colour>> getColours() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(colourServiceImpl.getColours());
    }

    @PostMapping(path = "post")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Colour> addColour(@RequestBody ColourCreation colourCreation) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(colourServiceImpl.addColour(colourCreation));
    }

    @PutMapping(path = "put/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Colour> editColour(@RequestBody Colour editedColour, @PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(colourServiceImpl.editColour(editedColour, id));
    }

    @DeleteMapping(path = "delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeColour(@PathVariable Long id) {
        colourServiceImpl.removeColour(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping(path = "delete/list")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeColours(@RequestBody Identifiers<Long> colourIds) {
        colourServiceImpl.removeColours(colourIds);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
