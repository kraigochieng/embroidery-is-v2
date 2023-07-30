package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Item;
import com.kraigochieng.embroideryis.server.repositories.ItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;
    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public ResponseEntity<List<Item>> getItems() {
        return ResponseEntity.ok(itemRepository.findAll());
    }

    public ResponseEntity<Item> addItem(Item item) {
        return  ResponseEntity.ok(itemRepository.save(item));
    }
    @Transactional
    public ResponseEntity<Item> editItem(Item editedItem, Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalStateException("Item not found during edit"));
        if(item.getName() != editedItem.getName() && editedItem.getName().length() > 0) {
            item.setName(editedItem.getName());
        }

        return ResponseEntity.ok(item);
    }

    public ResponseEntity<String> removeItem(Long id) {
        itemRepository.deleteById(id);
        return ResponseEntity.ok("Item with ID: " + id + " deleted.");
    }
}
