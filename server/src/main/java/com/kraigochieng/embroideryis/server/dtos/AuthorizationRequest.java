package com.kraigochieng.embroideryis.server.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class LoginRequest {
    private String username;
    private String password;
}
