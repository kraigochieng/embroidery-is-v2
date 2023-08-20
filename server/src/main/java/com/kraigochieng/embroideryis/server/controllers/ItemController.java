package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.dtos.ItemCreation;
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

@RestController
@RequestMapping(path = "/api/admin/items")
@CrossOrigin
public class ItemController {
    @Autowired
    ItemServiceImpl itemServiceImpl;

    @GetMapping(path = "get")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Item>> getItems() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(itemServiceImpl.getItems());
    }

    @PostMapping(path = "post")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Item> addItem(@RequestBody ItemCreation itemCreation) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(itemServiceImpl.addItem(itemCreation));
    }

    @PutMapping(path = "put/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Item> editItem(@RequestBody Item editedItem, @PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(itemServiceImpl.editItem(editedItem, id));
    }
    @DeleteMapping(path = "delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeItem(@PathVariable Long id) {
        itemServiceImpl.removeItem(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping(path = "delete/list")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeItems(@RequestBody Identifiers<Long> itemIds) {
        itemServiceImpl.removeItems(itemIds);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
