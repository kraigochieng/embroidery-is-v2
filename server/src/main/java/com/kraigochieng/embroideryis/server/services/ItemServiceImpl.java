package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.*;
import com.kraigochieng.embroideryis.server.mappers.ItemMapper;
import com.kraigochieng.embroideryis.server.models.Item;
import com.kraigochieng.embroideryis.server.repositories.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemMapper itemMapper;

    @Override
    public List<ItemSummary> getItems() {
        return itemRepository.findAll().stream()
                .map(itemMapper::itemToItemSummary)
                .toList();
    }

    @Override
    public ItemSummary addItem(ItemRequest itemRequest) {
        Item item = itemMapper.itemCreationToItem(itemRequest);
        return itemMapper.itemToItemSummary(itemRepository.save(item));
    }

    @Transactional
    public ItemSummary editItem(ItemRequest itemRequest, UUID id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new IllegalStateException("Item not found during edit"));
        if(!Objects.equals(item.getName(), itemRequest.getName())) {
            item.setName(itemRequest.getName());
        }

        return itemMapper.itemToItemSummary(item);
    }

    @Override
    public void removeItem(UUID id) {
        System.out.println(id);
        itemRepository.deleteById(id);
    }

    @Override
    public void removeItems(Identifiers<UUID> itemIds) {
        itemRepository.deleteAllById(itemIds.getIds());
    }
}
