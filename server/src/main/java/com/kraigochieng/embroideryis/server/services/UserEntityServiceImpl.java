package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.UserEntity;
import com.kraigochieng.embroideryis.server.repositories.UserEntityRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserEntityRepository userEntityRepository;

    public List<UserEntity> getUsers() {
        return userEntityRepository.findAll();
    }

    public UserEntity addUser(UserEntity userEntity) {
        return userEntityRepository.save(userEntity);
    }
    @Transactional
    public UserEntity editUser(UserEntity editedUserEntity, UUID id) {
        UserEntity userEntity = userEntityRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("User not found when trying to update user"));
        // Set first name
        if(editedUserEntity.getFirstName() != userEntity.getFirstName()) {
            userEntity.setFirstName(editedUserEntity.getFirstName());
        }

        if(editedUserEntity.getLastName() != userEntity.getLastName()) {
            userEntity.setLastName(editedUserEntity.getLastName());
        }

        return userEntity;
    }

    public void removeUser(UUID id) {
        userEntityRepository.deleteById(id);
    }
}
