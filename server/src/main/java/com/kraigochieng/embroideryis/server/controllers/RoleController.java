package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.models.Role;
import com.kraigochieng.embroideryis.server.services.RoleServiceImpl;
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
@RequestMapping(path = "/api/admin/roles")
@CrossOrigin
public class RoleController {
    @Autowired
    RoleServiceImpl roleServiceImpl;


    @GetMapping(path = "get")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Role>> getRoles() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(roleServiceImpl.getRoles());
    }
    @PostMapping(path = "post")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Role> addRole(@RequestBody Role role) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(roleServiceImpl.addRole(role));
    }

    @PutMapping(path = "put/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Role> editRole(@RequestBody Role editedRole,@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(roleServiceImpl.editRole(editedRole, id));
    }

    @DeleteMapping(path = "delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeRole(@PathVariable Long id) {
        roleServiceImpl.removeRole(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
