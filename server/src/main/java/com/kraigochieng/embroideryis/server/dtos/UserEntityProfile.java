package com.kraigochieng.embroideryis.server.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserEntityProfile {
        private UUID id;
        private String firstName;
        private String lastName;
        private String username;
}
