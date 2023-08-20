package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.authentication.LoginRequest;
import com.kraigochieng.embroideryis.server.authentication.RegisterRequest;
import com.kraigochieng.embroideryis.server.services.AuthenticationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/authentication")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    AuthenticationServiceImpl authenticationServiceImpl;

    @PostMapping(path = "login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authenticationServiceImpl.login(loginRequest));
    }
    @PostMapping(path = "register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
//        System.out.println(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authenticationServiceImpl.register(registerRequest));
    }
}
