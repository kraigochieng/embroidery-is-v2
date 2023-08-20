package com.kraigochieng.embroideryis.server.mappers;

import com.kraigochieng.embroideryis.server.dtos.ColourCreation;
import com.kraigochieng.embroideryis.server.models.Colour;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ColourMapper {
    ColourMapper INSTANCE = Mappers.getMapper(ColourMapper.class);

    default Colour ColourCreationToColour(ColourCreation colourCreation) {
        Colour colour = new Colour();
        colour.setName(colourCreation.getName());
        return colour;
    }
}
