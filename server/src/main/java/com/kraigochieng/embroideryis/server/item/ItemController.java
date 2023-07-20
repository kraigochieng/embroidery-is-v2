package com.kraigochieng.embroideryis.server.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/admin/items")
@CrossOrigin
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getColours() {
        return itemService.getItems();
    }

    @PostMapping
    public Item addColour(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @PutMapping("{id}")
    public Item editColour(@RequestBody Item editedItem, @PathVariable Long id) {
        return itemService.editItem(editedItem, id);
    }

    @DeleteMapping("{id}")
    public void removeColour(@PathVariable Long id) {
        itemService.removeItem(id);
    }
}
