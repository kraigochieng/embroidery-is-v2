package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Role;
import com.kraigochieng.embroideryis.server.repositories.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role addRole(Role role) {
        return  roleRepository.save(role);
    }

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role editRole(Role editedRole, Long id) {
        Role role = roleRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Role not found when trying to edit"));
        if(editedRole.getName() != editedRole.getName()) {
            role.setName(editedRole.getName());
        }
        return role;
    }

    public String removeRole(Long id) {
        roleRepository.deleteById(id);
        return "Role with ID: " + id + "was deleted";
    }
}