package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Colour;
import com.kraigochieng.embroideryis.server.repositories.ColourRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColourService {
    private final ColourRepository colourRepository;
    @Autowired
    public ColourService(ColourRepository colourRepository) {
        this.colourRepository = colourRepository;
    }

    public ResponseEntity<List<Colour>> getColours() {
        return ResponseEntity.ok(colourRepository.findAll());
    }

    public ResponseEntity<Colour> addColour(Colour colour) {
        return  ResponseEntity.ok(colourRepository.save(colour));
    }
    @Transactional
    public ResponseEntity<Colour> editColour(Colour editedColour, Long id) {
        Colour colour = colourRepository.findById(id).orElseThrow(() -> new IllegalStateException("Colour not found during edit"));
        if(colour.getName() != editedColour.getName() && editedColour.getName().length() > 0) {
            colour.setName(editedColour.getName());
        }

        return ResponseEntity.ok(colour);
    }


    public ResponseEntity<String> removeColour(Long id) {
        colourRepository.deleteById(id);
        return ResponseEntity.ok("Colour with ID: " + id + " deleted");
    }
}
