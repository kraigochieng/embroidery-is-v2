package com.kraigochieng.embroideryis.server.repositories;

import com.kraigochieng.embroideryis.server.models.Colour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ColourRepository extends JpaRepository<Colour, UUID> {

}
