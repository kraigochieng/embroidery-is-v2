package com.kraigochieng.embroideryis.server.mappers;

import com.kraigochieng.embroideryis.server.dtos.PositionRequest;
import com.kraigochieng.embroideryis.server.dtos.PositionResponse;
import com.kraigochieng.embroideryis.server.dtos.PositionSummary;
import com.kraigochieng.embroideryis.server.models.Position;
import org.springframework.stereotype.Component;

@Component
public class PositionMapper {
    public Position positionRequestToPosition(PositionRequest positionRequest) {
        Position position = new Position();
        position.setName(positionRequest.getName());
        return position;
    }

    public PositionResponse positionToPositionResponse(Position position) {
        PositionResponse positionResponse = new PositionResponse();
        positionResponse.setId(position.getId());
        positionResponse.setName(position.getName());
        positionResponse.setItemId(position.getItem().getId());
        return positionResponse;
    }

    public PositionSummary positionToPositionSummary(Position position) {
        PositionSummary positionSummary = new PositionSummary();
        positionSummary.setId(position.getId());
        positionSummary.setName(position.getName());
        return positionSummary;
    }
}
