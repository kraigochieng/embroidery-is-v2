package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.AuthorizationRequest;
import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.dtos.AuthResponse;
import com.kraigochieng.embroideryis.server.services.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "${EMBROIDERY_IS_V2_CLIENT_URL}"})
public class AuthController {
    @Autowired
    AuthServiceImpl authServiceImpl;

    @PostMapping(path = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthorizationRequest authorizationRequest) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authServiceImpl.login(authorizationRequest));
    }
    @PostMapping(path = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthenticationRequest authenticationRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authServiceImpl.register(authenticationRequest));
    }
}
