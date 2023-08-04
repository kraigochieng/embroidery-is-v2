package com.kraigochieng.embroideryis.server.models;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "position")
@Entity(name = "Position")
public class Position {
    @Id
    @SequenceGenerator(name = "position_sequence", sequenceName = "position_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "position_sequence")
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "item_id", foreignKey = @ForeignKey(name = "position_item_fk"))
    private Item item;

    @Column(name = "name")
    private String name;
}
