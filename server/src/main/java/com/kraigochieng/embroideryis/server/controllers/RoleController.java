package com.kraigochieng.embroideryis.server.controllers;

import com.kraigochieng.embroideryis.server.models.Role;
import com.kraigochieng.embroideryis.server.services.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/roles")
@CrossOrigin
public class RoleController {

    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<Role>> getRoles() {
        return ResponseEntity.ok(roleService.getRoles());
    }
    @PostMapping
    public ResponseEntity<Role> addRole(@RequestBody Role role) {
        return ResponseEntity.ok(roleService.addRole(role));
    }

    @PutMapping("{id}")
    public ResponseEntity<Role> editRole(@RequestBody Role editedRole,@PathVariable Long id) {
        return ResponseEntity.ok(roleService.editRole(editedRole, id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> removeRole(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.removeRole(id));
    }
}
