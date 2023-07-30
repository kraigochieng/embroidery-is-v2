package com.kraigochieng.embroideryis.server.colour;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/admin/colours")
@CrossOrigin
public class ColourController {
    private final ColourService colourService;

    @Autowired
    public ColourController(ColourService colourService) {
        this.colourService = colourService;
    }

    @GetMapping
    public List<Colour> getColours() {
        return colourService.getColours();
    }

    @PostMapping
    public Colour addColour(@RequestBody Colour colour) {
        return colourService.addColour(colour);
    }

    @PutMapping("{id}")
    public Colour editColour(@RequestBody Colour editedColour, @PathVariable Long id) {
        return colourService.editColour(editedColour, id);
    }

    @DeleteMapping("{id}")
    public void removeColour(@PathVariable Long id) {
        colourService.removeColour(id);
    }
}
