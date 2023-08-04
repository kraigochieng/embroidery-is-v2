package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Colour;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ColourService {
    public List<Colour> getColours();
    public Colour addColour(Colour colour);
    @Transactional
    public Colour editColour(Colour editedColour, Long id);
    public void removeColour(Long id);
}
