package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.Role;

import java.util.List;

public interface RoleService {
    public Role addRole(Role role);
    public List<Role> getRoles();
    public Role editRole(Role editedRole, Long id);
    public void removeRole(Long id);
}
