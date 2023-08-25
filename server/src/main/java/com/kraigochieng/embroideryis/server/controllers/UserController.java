package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.models.UserEntity;
import com.kraigochieng.embroideryis.server.services.UserEntityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;


import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/admin/users")
@CrossOrigin
public class UserController {
    @Autowired
    UserEntityServiceImpl userEntityServiceImpl;
    @GetMapping(path = "get")
    @PreAuthorize("hasAuthority('SCOPE_READ_USER')")
    public ResponseEntity<List<UserEntity>> getUsers() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userEntityServiceImpl.getUsers());
    }

    @PostMapping(path = "post")
    @PreAuthorize("hasAuthority('SCOPE_CREATE_USER')")
    public ResponseEntity<UserEntity> addUser(@RequestBody AuthenticationRequest authenticationRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userEntityServiceImpl.addUser(authenticationRequest));
    }

    @PutMapping(path = "put/{id}")
    @PreAuthorize("hasAuthority('SCOPE_UPDATE_USER')")
    public ResponseEntity<UserEntity> editUser(@RequestBody UserEntity editedUserEntity, @PathVariable UUID id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userEntityServiceImpl.editUser(editedUserEntity, id));
    }

    @DeleteMapping(path = "delete/{id}")
    @PreAuthorize("hasAuthority('SCOPE_DELETE_USER')")
    public ResponseEntity<Void> removeUser(@PathVariable UUID id) {
        userEntityServiceImpl.removeUser(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
