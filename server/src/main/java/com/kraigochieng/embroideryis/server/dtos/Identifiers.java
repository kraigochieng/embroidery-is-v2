package com.kraigochieng.embroideryis.server.dtos.ids;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class Identifiers<T> {
    List<T> ids;


    public List<T> getIds() {
        return this.ids;
    }

    public void setIds(List<T> ids) {
        this.ids = ids;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Identifiers)) return false;
        final Identifiers<?> other = (Identifiers<?>) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$ids = this.getIds();
        final Object other$ids = other.getIds();
        if (this$ids == null ? other$ids != null : !this$ids.equals(other$ids)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Identifiers;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $ids = this.getIds();
        result = result * PRIME + ($ids == null ? 43 : $ids.hashCode());
        return result;
    }

    public String toString() {
        return "Identifiers(ids=" + this.getIds() + ")";
    }
}
