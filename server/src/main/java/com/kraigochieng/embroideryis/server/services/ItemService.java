package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.dtos.ItemCreation;
import com.kraigochieng.embroideryis.server.models.Item;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    public List<Item> getItems();
    public Item addItem(ItemCreation itemCreation);
    @Transactional
    public Item editItem(Item editedItem, Long id);
    public void removeItem(Long id);

    public void removeItems(Identifiers<Long> itemIds);
}
