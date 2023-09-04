package com.kraigochieng.embroideryis.server.dtos;

import com.kraigochieng.embroideryis.server.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserEntitySummary {
    private UUID id;
    private String firstName;
    private String lastName;
    private String username;
}
