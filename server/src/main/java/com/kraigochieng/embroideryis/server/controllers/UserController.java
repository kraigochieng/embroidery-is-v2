package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.models.User;
import com.kraigochieng.embroideryis.server.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
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

@RestController
@RequestMapping(path = "/api/admin/users")
@CrossOrigin
public class UserController {
    @Autowired
    UserServiceImpl userServiceImpl;
    @GetMapping(path = "get")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userServiceImpl.getUsers());
    }

    @PostMapping(path = "post")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userServiceImpl.addUser(user));
    }

    @PutMapping(path = "put/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> editUser(@RequestBody User editedUser, @PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userServiceImpl.editUser(editedUser, id));
    }

    @DeleteMapping(path = "delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeUser(@PathVariable Long id) {
        userServiceImpl.removeUser(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
