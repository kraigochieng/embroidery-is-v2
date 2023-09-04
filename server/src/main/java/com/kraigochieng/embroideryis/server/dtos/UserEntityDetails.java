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
public class UserEntityDetails {
        private UUID id;
        private String firstName;
        private String lastName;
        private String username;
        private List<Role> roles;
        private boolean isAccountNonExpired = true;
        public boolean isAccountNonLocked = true;
        public boolean isCredentialsNonExpired = true;
        public boolean isEnabled = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
}
