package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.models.UserEntity;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface UserEntityService {

    public List<UserEntity> getUsers();
    public UserEntity addUser(AuthenticationRequest authenticationRequest);
    @Transactional
    public UserEntity editUser(UserEntity editedUserEntity, UUID id);
    public void removeUser(UUID id);
}
