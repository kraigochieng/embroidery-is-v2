package com.kraigochieng.embroideryis.server.clrs;

import com.kraigochieng.embroideryis.server.dtos.ColourRequest;
import com.kraigochieng.embroideryis.server.dtos.ItemRequest;
import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.dtos.PositionRequest;
import com.kraigochieng.embroideryis.server.dtos.ItemSummary;
import com.kraigochieng.embroideryis.server.models.Role;
import com.kraigochieng.embroideryis.server.services.ColourServiceImpl;
import com.kraigochieng.embroideryis.server.services.ItemServiceImpl;
import com.kraigochieng.embroideryis.server.services.PositionServiceImpl;
import com.kraigochieng.embroideryis.server.services.UserEntityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    ItemServiceImpl itemServiceImpl;

    @Autowired
    ColourServiceImpl colourServiceImpl;

    @Autowired
    UserEntityServiceImpl userEntityServiceImpl;

    @Autowired
    PositionServiceImpl positionServiceImpl;

    @Override
    public void run(String... args) throws Exception {
        // Users
        AuthenticationRequest authenticationRequest = new AuthenticationRequest();
        authenticationRequest.setFirstName("Kraig");
        authenticationRequest.setLastName("Ochieng");
        authenticationRequest.setUsername("kraig");
        authenticationRequest.setPassword("password");
        authenticationRequest.setRoles(List.of(
                Role.CREATE_COLOUR, Role.READ_COLOUR, Role.UPDATE_COLOUR, Role.DELETE_COLOUR,
                Role.CREATE_ITEM, Role.READ_ITEM, Role.UPDATE_ITEM, Role.DELETE_ITEM,
                Role.CREATE_POSITION, Role.READ_POSITION, Role.UPDATE_POSITION, Role.DELETE_POSITION,
                Role.CREATE_USER, Role.READ_USER, Role.UPDATE_USER, Role.DELETE_USER
        ));

        AuthenticationRequest authenticationRequest1 = new AuthenticationRequest();
        authenticationRequest1.setFirstName("Kraig2");
        authenticationRequest1.setLastName("Ochieng2");
        authenticationRequest1.setUsername("kraig2");
        authenticationRequest1.setPassword("password");
        authenticationRequest1.setRoles(List.of(
                Role.CREATE_COLOUR, Role.READ_COLOUR, Role.UPDATE_COLOUR, Role.DELETE_COLOUR,
                Role.CREATE_ITEM, Role.READ_ITEM, Role.UPDATE_ITEM, Role.DELETE_ITEM,
                Role.CREATE_POSITION, Role.READ_POSITION, Role.UPDATE_POSITION, Role.DELETE_POSITION
        ));

        List<AuthenticationRequest> authenticationRequests = List.of(
                authenticationRequest,
                authenticationRequest1
        );

        for(AuthenticationRequest authenticationRequestParam : authenticationRequests) {
            userEntityServiceImpl.addUser(authenticationRequestParam);
        }

        // Colours
        ColourRequest colourRequest = new ColourRequest("red");
        ColourRequest colourRequest1 = new ColourRequest("blue");
        ColourRequest colourRequest2 = new ColourRequest("orange");
        ColourRequest colourRequest3 = new ColourRequest("indigo");
        ColourRequest colourRequest4 = new ColourRequest("maroon");
        ColourRequest colourRequest5 = new ColourRequest("purple");
        ColourRequest colourRequest6 = new ColourRequest("pink");

        List<ColourRequest> colourRequests = List.of(colourRequest,
                colourRequest1,
                colourRequest2,
                colourRequest3,
                colourRequest4,
                colourRequest5,
                colourRequest6
        );

        for(ColourRequest colourRequestParam : colourRequests) {
            colourServiceImpl.addColour(colourRequestParam);
        }

        // Items
        ItemRequest itemRequest = new ItemRequest("blazer");
        ItemRequest itemRequest1 = new ItemRequest("shirt");
        ItemRequest itemRequest2 = new ItemRequest("handkerchief");
        ItemRequest itemRequest3 = new ItemRequest("t-shirt");
        ItemRequest itemRequest4 = new ItemRequest("fleece");

        List<ItemRequest> itemRequests = List.of(
                itemRequest,
                itemRequest1,
                itemRequest2,
                itemRequest3,
                itemRequest4
        );

        for(ItemRequest itemRequestParam : itemRequests) {
            itemServiceImpl.addItem(itemRequestParam);
        }

        // Positions
        for(ItemSummary itemSummary: itemServiceImpl.getItems()) {
            List<String> positionNames = List.of("A", "B", "C", "D");
            for(String positionName: positionNames) {
                PositionRequest positionRequest = new PositionRequest();
                positionRequest.setName(positionName + " " + itemSummary.getName());
                positionServiceImpl.addPosition(positionRequest, itemSummary.getId());
            }
        }
    };
}
