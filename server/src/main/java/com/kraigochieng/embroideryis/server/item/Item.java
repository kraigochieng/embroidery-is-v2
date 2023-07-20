package com.kraigochieng.embroideryis.server.item;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
