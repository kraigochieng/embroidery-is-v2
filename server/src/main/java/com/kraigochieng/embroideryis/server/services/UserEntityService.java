package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.models.UserEntity;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface UserService {

    public List<UserEntity> getUsers();
    public UserEntity addUser(UserEntity userEntity);
    @Transactional
    public UserEntity editUser(UserEntity editedUserEntity, UUID id);
    public void removeUser(UUID id);
}
