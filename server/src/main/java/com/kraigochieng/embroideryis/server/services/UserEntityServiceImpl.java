package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.dtos.UserEntityDetails;
import com.kraigochieng.embroideryis.server.dtos.UserEntitySummary;
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

    @Override
    public List<UserEntitySummary> getUsers() {
        return userEntityRepository.findAll().stream()
                .map(userEntityMapper::userEntityToUserEntitySummary)
                .toList();
    }

    @Override
    public UserEntityDetails getUserDetails(UUID id) {
        UserEntity userEntity = userEntityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userEntityMapper.userEntityToUserEntityDetails(userEntity);
    }

    @Override
    public UserEntity addUser(AuthenticationRequest authenticationRequest) {
        UserEntity userEntity = userEntityMapper.registerRequestToUserEntity(authenticationRequest);
        return userEntityRepository.save(userEntity);
    }
    @Transactional
    @Override
    public UserEntitySummary editUser(UserEntityDetails userEntityDetails, UUID id) {
        UserEntity userEntity = userEntityRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("User not found when trying to update user"));
        // Set first name
        if(!Objects.equals(userEntityDetails.getFirstName(), userEntity.getFirstName())) {
            userEntity.setFirstName(userEntityDetails.getFirstName());
        }

        if(!Objects.equals(userEntityDetails.getLastName(), userEntity.getLastName())) {
            userEntity.setLastName(userEntityDetails.getLastName());
        }


        return userEntityMapper.userEntityToUserEntitySummary(userEntity);
    }

    @Override
    public void removeUser(UUID id) {
        userEntityRepository.deleteById(id);
    }
}
