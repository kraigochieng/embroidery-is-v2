package com.kraigochieng.embroideryis.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "colour", uniqueConstraints = {
        @UniqueConstraint(name = "colour_name_unique", columnNames = "name")
})
@Entity(name = "Colour")
public class Colour {
    @Id
    @SequenceGenerator(name = "colour_sequence", sequenceName = "colour_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "colour_sequence")
    private Long id;
    @Column(name = "name", unique = true)
    private String name;
}
