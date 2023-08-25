package com.kraigochieng.embroideryis.server.repositories;

import com.kraigochieng.embroideryis.server.dtos.ItemWithPositions;
import com.kraigochieng.embroideryis.server.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, UUID> {
}
