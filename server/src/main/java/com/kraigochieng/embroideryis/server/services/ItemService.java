package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.Identifiers;
import com.kraigochieng.embroideryis.server.dtos.ItemRequest;
import com.kraigochieng.embroideryis.server.dtos.ItemSummary;
import com.kraigochieng.embroideryis.server.dtos.ItemWithPositions;
import com.kraigochieng.embroideryis.server.models.Item;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface ItemService {
    public List<ItemSummary> getItems();
    public ItemSummary addItem(ItemRequest itemRequest);
    @Transactional
    public ItemSummary editItem(ItemRequest itemRequest, UUID id);
    public void removeItem(UUID id);
    public void removeItems(Identifiers<UUID> itemIds);
}
