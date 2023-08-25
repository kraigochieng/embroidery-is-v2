package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.ColourRequest;
import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.models.Colour;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface ColourService {
    public List<Colour> getColours();
    public Colour addColour(ColourRequest colourRequest);
    @Transactional
    public Colour editColour(ColourRequest colourRequest, UUID id);
    public void removeColour(UUID id);
    public void removeColours(Identifiers<UUID> colours);
}
