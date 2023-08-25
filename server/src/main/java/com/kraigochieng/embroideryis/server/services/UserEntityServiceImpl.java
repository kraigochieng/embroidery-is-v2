package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.mappers.UserEntityMapper;
import com.kraigochieng.embroideryis.server.models.UserEntity;
import com.kraigochieng.embroideryis.server.repositories.UserEntityRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class UserEntityServiceImpl implements UserEntityService {
    @Autowired
    UserEntityRepository userEntityRepository;

    @Autowired
    UserEntityMapper userEntityMapper;

    public List<UserEntity> getUsers() {
        return userEntityRepository.findAll();
    }

    public UserEntity addUser(AuthenticationRequest authenticationRequest) {
        UserEntity userEntity = userEntityMapper.registerRequestToUserEntity(authenticationRequest);
        return userEntityRepository.save(userEntity);
    }
    @Transactional
    public UserEntity editUser(UserEntity editedUserEntity, UUID id) {
        UserEntity userEntity = userEntityRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("User not found when trying to update user"));
        // Set first name
        if(!Objects.equals(editedUserEntity.getFirstName(), userEntity.getFirstName())) {
            userEntity.setFirstName(editedUserEntity.getFirstName());
        }

        if(!Objects.equals(editedUserEntity.getLastName(), userEntity.getLastName())) {
            userEntity.setLastName(editedUserEntity.getLastName());
        }

        return userEntity;
    }

    public void removeUser(UUID id) {
        userEntityRepository.deleteById(id);
    }
}
