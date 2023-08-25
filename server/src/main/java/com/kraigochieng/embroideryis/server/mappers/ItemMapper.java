package com.kraigochieng.embroideryis.server.mappers;

import com.kraigochieng.embroideryis.server.dtos.ItemRequest;
import com.kraigochieng.embroideryis.server.dtos.ItemWithPositions;
import com.kraigochieng.embroideryis.server.dtos.ItemSummary;
import com.kraigochieng.embroideryis.server.models.Item;
import com.kraigochieng.embroideryis.server.services.PositionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {
    @Autowired
    PositionMapper positionMapper;

//    @Autowired
//    PositionServiceImpl positionServiceImpl;

    public Item itemCreationToItem(ItemRequest itemRequest) {
        Item item = new Item();
        item.setName(itemRequest.getName());
        return item;
    }

    public ItemSummary itemToItemSummary(Item item) {
        ItemSummary itemSummary = new ItemSummary();
        itemSummary.setId(item.getId());
        itemSummary.setName(item.getName());
        return itemSummary;
    }

    public ItemWithPositions itemToItemWithPositions(Item item) {
        ItemWithPositions itemWithPositions = new ItemWithPositions();
        itemWithPositions.setId(item.getId());
        itemWithPositions.setName(item.getName());

//        itemWithPositions.setPositions(item.getPositions().stream()
//                .map(positionMapper::positionToPositionSummary)
//                .toList()
//        );
        return itemWithPositions;
    }
}
