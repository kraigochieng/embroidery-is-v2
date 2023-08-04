package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.User;
import com.kraigochieng.embroideryis.server.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }
    @Transactional
    public User editUser(User editedUser, Long id) {
        User user = userRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("User not found when trying to update user"));
        // Set first name
        if(editedUser.getFirstName() != user.getFirstName()) {
            user.setFirstName(editedUser.getFirstName());
        }

        if(editedUser.getLastName() != user.getLastName()) {
            user.setLastName(editedUser.getLastName());
        }

        return user;
    }

    public void removeUser(Long id) {
        userRepository.deleteById(id);
    }
}
