package com.kraigochieng.embroideryis.server.dtos;

import com.kraigochieng.embroideryis.server.models.Role;

import java.util.List;

public record UserSummary(
        Long id,
        String firstName,
        String lastName,
        String username,
        List<Role> roles


) {
}
