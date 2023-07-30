package com.kraigochieng.embroideryis.server.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "item", uniqueConstraints = {
        @UniqueConstraint(name = "item_name_unique", columnNames = "name")
})
@Entity(name = "Item")
public class Item {
    @Id
    @SequenceGenerator(name = "item_sequence", sequenceName = "item_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_sequence")
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @JsonManagedReference
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Position> positions;
}
