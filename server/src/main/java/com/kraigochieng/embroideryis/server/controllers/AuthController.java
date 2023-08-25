package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.request.LoginRequest;
import com.kraigochieng.embroideryis.server.dtos.request.RegisterRequest;
import com.kraigochieng.embroideryis.server.services.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    AuthServiceImpl authServiceImpl;

    @PostMapping(path = "login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authServiceImpl.login(loginRequest));
    }
    @PostMapping(path = "register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
//        System.out.println(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authServiceImpl.register(registerRequest));
    }
}
