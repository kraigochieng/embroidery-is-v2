package com.kraigochieng.embroideryis.server.authentication;

import com.kraigochieng.embroideryis.server.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private List<Role> roles;
}
