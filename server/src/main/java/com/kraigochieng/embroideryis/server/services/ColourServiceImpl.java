package com.kraigochieng.embroideryis.server.services;
import com.kraigochieng.embroideryis.server.dtos.ColourRequest;
import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.mappers.ColourMapper;
import com.kraigochieng.embroideryis.server.models.Colour;
import com.kraigochieng.embroideryis.server.repositories.ColourRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class ColourServiceImpl implements ColourService{
    @Autowired
    ColourRepository colourRepository;
    @Override
    public List<Colour> getColours() {
        return colourRepository.findAll();
    }

    @Autowired
    ColourMapper colourMapper;
    @Override
    public Colour addColour(ColourRequest colourRequest) {
        Colour colour = colourMapper.colourCreationToColour(colourRequest);
        return colourRepository.save(colour);
    }

    @Transactional
    @Override
    public Colour editColour(ColourRequest colourRequest, UUID id) {
        Colour colour = colourRepository.findById(id).orElseThrow(() -> new IllegalStateException("Colour not found during edit"));
        if(!Objects.equals(colour.getName(), colourRequest.getName())) {
            colour.setName(colourRequest.getName());
        }

        return colour;
    }

    @Override
    public void removeColour(UUID id) {
        colourRepository.deleteById(id);
    }

    @Override
    public void removeColours(Identifiers<UUID> colourIds) {
        colourRepository.deleteAllById(colourIds.getIds());
    }
}
