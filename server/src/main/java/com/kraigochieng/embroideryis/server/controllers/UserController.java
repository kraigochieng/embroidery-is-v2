package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.models.User;
import com.kraigochieng.embroideryis.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @PutMapping("{id}")
    public ResponseEntity<User> editUser(@RequestBody User editedUser, @PathVariable Long id) {
        return ResponseEntity.ok(userService.editUser(editedUser, id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> removeUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.removeUser(id));
    }
}
