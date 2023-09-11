package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.*;
import com.kraigochieng.embroideryis.server.models.Position;
import com.kraigochieng.embroideryis.server.services.ItemServiceImpl;
import com.kraigochieng.embroideryis.server.models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/admin/items")
@CrossOrigin(origins = "${EMBROIDERY_IS_V2_CLIENT_URL}")
public class ItemController {
    @Autowired
    ItemServiceImpl itemServiceImpl;


    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_READ_ITEM')")
    public ResponseEntity<List<ItemSummary>> getItems() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(itemServiceImpl.getItems());
    }

//    @GetMapping("{itemId}/positions")
//    @PreAuthorize("hasAnyAuthority('SCOPE_READ_ITEM', 'SCOPE_READ_POSITION')")
//    public ResponseEntity<ItemWithPositions> getItemWithPositions(@PathVariable UUID itemId) {
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(itemServiceImpl.getItemWithPositions(itemId));
//    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_CREATE_ITEM')")
    public ResponseEntity<ItemSummary> addItem(@RequestBody ItemRequest itemRequest) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(itemServiceImpl.addItem(itemRequest));
    }

    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('SCOPE_UPDATE_ITEM')")
    public ResponseEntity<ItemSummary> editItem(@RequestBody ItemRequest itemRequest, @PathVariable UUID id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(itemServiceImpl.editItem(itemRequest, id));
    }
    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('SCOPE_DELETE_ITEM')")
    public ResponseEntity<Void> removeItem(@PathVariable UUID id) {
        itemServiceImpl.removeItem(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('SCOPE_DELETE_ITEM')")
    public ResponseEntity<Void> removeItems(@RequestBody Identifiers<UUID> itemIds) {
        itemServiceImpl.removeItems(itemIds);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
