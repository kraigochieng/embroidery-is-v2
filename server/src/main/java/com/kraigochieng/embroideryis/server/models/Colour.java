package com.kraigochieng.embroideryis.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "colour", uniqueConstraints = {
        @UniqueConstraint(name = "colour_name_unique", columnNames = "name")
})
@Entity(name = "Colour")
public class Colour {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", unique = true)
    private String name;
}
