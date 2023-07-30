package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.models.Colour;
import com.kraigochieng.embroideryis.server.services.ColourService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/admin/colours")
@CrossOrigin
public class ColourController {
    private final ColourService colourService;

    @Autowired
    public ColourController(ColourService colourService) {
        this.colourService = colourService;
    }

    @GetMapping
    public ResponseEntity<List<Colour>> getColours() {
        return colourService.getColours();
    }

    @PostMapping
    public ResponseEntity<Colour> addColour(@RequestBody Colour colour) {
        return colourService.addColour(colour);
    }

    @PutMapping("{id}")
    public ResponseEntity<Colour> editColour(@RequestBody Colour editedColour, @PathVariable Long id) {
        return colourService.editColour(editedColour, id);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> removeColour(@PathVariable Long id) {
        return colourService.removeColour(id);
    }
}
