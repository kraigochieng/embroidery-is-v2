package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Item;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    public List<Item> getItems();
    public ResponseEntity<Item> addItem(Item item);
    @Transactional
    public Item editItem(Item editedItem, Long id);
    public void removeItem(Long id);
}
