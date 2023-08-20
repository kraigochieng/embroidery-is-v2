package com.kraigochieng.embroideryis.server.mappers;

import com.kraigochieng.embroideryis.server.dtos.ItemCreation;
import com.kraigochieng.embroideryis.server.models.Item;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ItemMapper {
    ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

    default Item itemCreationToItem(ItemCreation itemCreation) {
        Item item = new Item();
        item.setName(itemCreation.getName());
        return item;
    }
}
