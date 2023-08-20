package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.ColourCreation;
import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.models.Colour;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ColourService {
    public List<Colour> getColours();
    public Colour addColour(ColourCreation colourCreation);
    @Transactional
    public Colour editColour(Colour editedColour, Long id);
    public void removeColour(Long id);
    public void removeColours(Identifiers<Long> colours);
}
