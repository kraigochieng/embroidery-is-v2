package com.kraigochieng.embroideryis.server.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
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


    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public List<Position> getPositions() {
        return this.positions;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Item)) return false;
        final Item other = (Item) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        final Object this$positions = this.getPositions();
        final Object other$positions = other.getPositions();
        if (this$positions == null ? other$positions != null : !this$positions.equals(other$positions)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Item;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        final Object $positions = this.getPositions();
        result = result * PRIME + ($positions == null ? 43 : $positions.hashCode());
        return result;
    }

    public String toString() {
        return "Item(id=" + this.getId() + ", name=" + this.getName() + ", positions=" + this.getPositions() + ")";
    }
}
