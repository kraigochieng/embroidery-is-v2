package com.kraigochieng.embroideryis.server.services;

import org.springframework.security.core.Authentication;

public interface JwtService {
    public String generateToken(Authentication authentication);
}
