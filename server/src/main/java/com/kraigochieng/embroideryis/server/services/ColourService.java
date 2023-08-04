package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Colour;
import com.kraigochieng.embroideryis.server.repositories.ColourRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ColourService {
    public List<Colour> getColours();
    public Colour addColour(Colour colour);
    @Transactional
    public Colour editColour(Colour editedColour, Long id);
    public void removeColour(Long id);
}
