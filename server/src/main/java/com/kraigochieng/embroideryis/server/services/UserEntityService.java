package com.kraigochieng.embroideryis.server.services;

import com.kraigochieng.embroideryis.server.dtos.AuthenticationRequest;
import com.kraigochieng.embroideryis.server.dtos.UserEntityDetails;
import com.kraigochieng.embroideryis.server.dtos.UserEntitySummary;
import com.kraigochieng.embroideryis.server.models.UserEntity;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;

import java.util.List;
import java.util.UUID;

public interface UserEntityService {

    public List<UserEntitySummary> getUsers();
    public UserEntityDetails getUserDetails(UUID id);
    public UserEntity addUser(AuthenticationRequest authenticationRequest);
    @Transactional
    public UserEntitySummary editUser(UserEntityDetails userEntityDetails, UUID id);
    public void removeUser(UUID id);
}
