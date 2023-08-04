package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Item;
import com.kraigochieng.embroideryis.server.repositories.ItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;

    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    public ResponseEntity<Item> addItem(Item item) {
        return  ResponseEntity.ok(itemRepository.save(item));
    }
    @Transactional
    public Item editItem(Item editedItem, Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalStateException("Item not found during edit"));
        if(item.getName() != editedItem.getName() && editedItem.getName().length() > 0) {
            item.setName(editedItem.getName());
        }

        return item;
    }

    public void removeItem(Long id) {
        itemRepository.deleteById(id);
    }
}
