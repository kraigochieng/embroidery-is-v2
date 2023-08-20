package com.kraigochieng.embroideryis.server.services;
import com.kraigochieng.embroideryis.server.dtos.ColourCreation;
import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.mappers.ColourMapper;
import com.kraigochieng.embroideryis.server.models.Colour;
import com.kraigochieng.embroideryis.server.repositories.ColourRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColourServiceImpl implements ColourService{
    @Autowired
    ColourRepository colourRepository;
    @Override
    public List<Colour> getColours() {
        return colourRepository.findAll();
    }

    @Override
    public Colour addColour(ColourCreation colourCreation) {
        Colour colour = ColourMapper.INSTANCE.ColourCreationToColour(colourCreation);
        return colourRepository.save(colour);
    }

    @Transactional
    @Override
    public Colour editColour(Colour editedColour, Long id) {
        Colour colour = colourRepository.findById(id).orElseThrow(() -> new IllegalStateException("Colour not found during edit"));
        if(colour.getName() != editedColour.getName() && editedColour.getName().length() > 0) {
            colour.setName(editedColour.getName());
        }

        return colour;
    }

    @Override
    public void removeColour(Long id) {
        colourRepository.deleteById(id);
    }

    @Override
    public void removeColours(Identifiers<Long> colourIds) {
        colourRepository.deleteAllById(colourIds.getIds());
    }
}
