package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.AuthorizationRequest;
import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.dtos.AuthResponse;

public interface AuthService {
    public AuthResponse login(AuthorizationRequest authorizationRequest);
    public AuthResponse register(AuthenticationRequest authenticationRequest);

}

