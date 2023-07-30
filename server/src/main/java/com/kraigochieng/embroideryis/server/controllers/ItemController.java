package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.services.ItemService;
import com.kraigochieng.embroideryis.server.models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/admin/items")
@CrossOrigin
public class ItemController {
    private final ItemService itemService;

    @Autowired()
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<Item>> getItems() {
        return itemService.getItems();
    }

    @PostMapping
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @PutMapping("{id}")
    public ResponseEntity<Item> editItem(@RequestBody Item editedItem, @PathVariable Long id) {
        return itemService.editItem(editedItem, id);
    }
    @DeleteMapping("{id}")
    public void removeColour(@PathVariable Long id) {
        itemService.removeItem(id);
    }
}
