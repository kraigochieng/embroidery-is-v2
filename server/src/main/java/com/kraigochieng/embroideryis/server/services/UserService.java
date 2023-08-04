package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;

public interface UserService {

    public List<User> getUsers();
    public User addUser(User user);
    @Transactional
    public User editUser(User editedUser, Long id);
    public void removeUser(Long id);
}
