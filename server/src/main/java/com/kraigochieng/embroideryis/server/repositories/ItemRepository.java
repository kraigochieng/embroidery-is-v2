package com.kraigochieng.embroideryis.server.repositories;

import com.kraigochieng.embroideryis.server.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
