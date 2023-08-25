package com.kraigochieng.embroideryis.server.mappers;

import com.kraigochieng.embroideryis.server.dtos.ColourRequest;
import com.kraigochieng.embroideryis.server.models.Colour;
import org.springframework.stereotype.Component;


@Component
public class ColourMapper {
    public Colour colourCreationToColour(ColourRequest colourRequest) {
        Colour colour = new Colour();
        colour.setName(colourRequest.getName());
        return colour;
    }
}
